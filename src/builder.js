const { ChannelType, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { DEFAULT_RULES } = require('./dsl');

const TYPE = {
  text: ChannelType.GuildText,
  news: ChannelType.GuildAnnouncement,
  forum: ChannelType.GuildForum,
  voice: ChannelType.GuildVoice,
  stage: ChannelType.GuildStageVoice,
};
// community-only kinds fall back to a plain channel when the server isn't a community server
const FALLBACK = { news: 'text', forum: 'text', stage: 'voice' };
const TEXTLIKE = new Set(['text', 'news', 'forum']);
const REASON = 'themed server setup';

const norm = (s) => s.toLowerCase().replace(/\s+/g, '-');

function channelName(def, kind, ch) {
  const sep = def.sep ?? '┃';
  return TEXTLIKE.has(kind) ? `${ch.emoji}${sep}${ch.name}` : `${ch.emoji} ${ch.name}`;
}

function categoryName(def, cat) {
  const [l, r] = def.wrap ?? ['', ''];
  return `${l}${cat.emoji} ${cat.name}${r}`.slice(0, 100);
}

function overwritesFor(guild, staffRoles, { staffOnly, readonly }) {
  if (!staffOnly && !readonly) return undefined;
  const me = guild.members.me.id;
  const deny = [];
  if (staffOnly) deny.push(PermissionFlagsBits.ViewChannel);
  if (readonly) deny.push(PermissionFlagsBits.SendMessages, PermissionFlagsBits.CreatePublicThreads);
  const allow = [
    PermissionFlagsBits.ViewChannel,
    PermissionFlagsBits.SendMessages,
    PermissionFlagsBits.EmbedLinks,
    PermissionFlagsBits.Connect,
  ];
  return [
    { id: guild.roles.everyone.id, deny },
    ...staffRoles.map((r) => ({ id: r.id, allow })),
    { id: me, allow },
  ];
}

function buildPost(def, spec, guildName) {
  const e = new EmbedBuilder().setColor(def.color ?? 0x5865f2);
  if (spec === 'welcome') {
    const w = def.welcome ?? {};
    return e.setTitle(w.title ?? `Welcome to ${guildName}`).setDescription(w.description ?? 'read the rules and say hi.');
  }
  if (spec === 'rules') {
    const lines = def.rules ?? DEFAULT_RULES;
    return e.setTitle('📜 Rules').setDescription(lines.map((l, i) => `**${i + 1}.** ${l}`).join('\n'));
  }
  e.setTitle(spec.title);
  return e.setDescription(spec.lines ? spec.lines.map((l, i) => `**${i + 1}.** ${l}`).join('\n') : spec.description);
}

async function createChannel(guild, opts, kind) {
  try {
    return await guild.channels.create({ ...opts, type: TYPE[kind] });
  } catch (err) {
    const fb = FALLBACK[kind];
    if (!fb) throw err;
    const { topic, ...rest } = opts;
    return guild.channels.create({ ...(TEXTLIKE.has(fb) ? opts : rest), type: TYPE[fb] });
  }
}

/**
 * mode 'replace' deletes every existing channel first. roles are never deleted;
 * a role whose name already exists is reused. in 'add' mode existing categories / channels
 * with the same name are reused, so running a command twice does not duplicate anything.
 */
async function build(guild, def, { mode = 'add', onProgress = () => {} } = {}) {
  const stats = { roles: 0, categories: 0, channels: 0, deleted: 0, warnings: [] };
  await Promise.all([guild.channels.fetch(), guild.roles.fetch()]);

  if (mode === 'replace') {
    const all = [...guild.channels.cache.values()].sort((a, b) => (a.type === ChannelType.GuildCategory) - (b.type === ChannelType.GuildCategory));
    let n = 0;
    for (const ch of all) {
      onProgress(`🧹 clearing old channels (${++n}/${all.length})`);
      try { await ch.delete(REASON); stats.deleted++; } catch { stats.warnings.push(`could not delete #${ch.name} (community required channel?)`); }
    }
  }

  const staff = [];
  const roles = def.roles ?? [];
  for (const [i, r] of roles.entries()) {
    onProgress(`🎭 roles (${i + 1}/${roles.length})`);
    let role = guild.roles.cache.find((x) => x.name === r.name);
    if (!role) {
      try {
        role = await guild.roles.create({ name: r.name, color: r.color, hoist: !!r.hoist, mentionable: !!r.mentionable, permissions: r.perms ?? [], reason: REASON });
        stats.roles++;
      } catch (err) {
        stats.warnings.push(`role ${r.name}: ${err.message}`);
        continue;
      }
    }
    if (r.staff) staff.push(role);
  }

  const total = def.categories.reduce((n, c) => n + c.channels.length, 0);
  let done = 0;
  for (const cat of def.categories) {
    const staffOnly = !!cat.staff;
    const catName = categoryName(def, cat);
    let parent = guild.channels.cache.find((c) => c.type === ChannelType.GuildCategory && c.name === catName);
    if (!parent) {
      parent = await guild.channels.create({
        name: catName,
        type: ChannelType.GuildCategory,
        permissionOverwrites: overwritesFor(guild, staff, { staffOnly }),
        reason: REASON,
      });
      stats.categories++;
    }

    for (const ch of cat.channels) {
      onProgress(`🏗️ building channels (${++done}/${total})`);
      const kind = ch.kind;
      const name = channelName(def, kind, ch);
      const exists = guild.channels.cache.some((c) => c.parentId === parent.id && norm(c.name) === norm(name));
      if (exists) continue;
      try {
        const opts = {
          name,
          parent: parent.id,
          reason: REASON,
          topic: ch.topic,
          rateLimitPerUser: ch.slow,
          userLimit: ch.limit,
          permissionOverwrites: overwritesFor(guild, staff, { staffOnly, readonly: ch.readonly }),
        };
        if (!TEXTLIKE.has(kind)) { delete opts.topic; delete opts.rateLimitPerUser; }
        if (kind !== 'voice') delete opts.userLimit;
        const made = await createChannel(guild, opts, kind);
        stats.channels++;
        if (ch.post && made.isTextBased()) await made.send({ embeds: [buildPost(def, ch.post, guild.name)] }).catch(() => {});
      } catch (err) {
        stats.warnings.push(`${name}: ${err.message}`);
      }
    }
  }
  return stats;
}

const countChannels = (def) => def.categories.reduce((n, c) => n + c.channels.length, 0);

module.exports = { build, countChannels };
