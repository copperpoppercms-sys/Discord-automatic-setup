require('dotenv').config();
const {
  Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder,
  ButtonBuilder, ButtonStyle, PermissionFlagsBits, MessageFlags,
} = require('discord.js');
const { THEMES, byKey } = require('./themes');
const { ALL: PACKS } = require('./packs');
const { build, countChannels } = require('./builder');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const busy = new Set();
const EPHEMERAL = MessageFlags.Ephemeral;

const packByKey = (k) => PACKS.find((p) => p.key === k);
const resolve = (kind, key) => (kind === 't' ? byKey(key) : packByKey(key));

function setupEmbed() {
  const themeLines = THEMES.map((t) => `${t.emoji} **/${t.key}** — ${t.description}`).join('\n');
  const packLines = PACKS.map((p) => `${p.emoji} **${p.label}** — ${p.description}`).join('\n');
  return new EmbedBuilder()
    .setColor(0x5865f2)
    .setTitle('🛠️ Server setup')
    .setDescription(
      'run a theme command or pick one from the menu below. each theme builds roles, sorted emoji categories, channels, voice rooms and welcome/rules embeds.\n\n' +
      `**🎨 Theme commands**\n${themeLines}\n\n` +
      `**🧩 Packs** — \`/addon pack:<name>\` adds to the server, deletes nothing\n${packLines}`,
    );
}

function pickMenu() {
  const options = [
    ...THEMES.map((t) => ({ label: t.label, value: `t:${t.key}`, description: t.description.slice(0, 100), emoji: t.emoji })),
    ...PACKS.map((p) => ({ label: `${p.label} (pack)`, value: `p:${p.key}`, description: p.description.slice(0, 100), emoji: p.emoji })),
  ];
  return new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder().setCustomId('pick').setPlaceholder('pick a theme or pack…').addOptions(options),
  );
}

function confirmPayload(kind, def) {
  const isTheme = kind === 't';
  const embed = new EmbedBuilder()
    .setColor(def.color ?? 0x5865f2)
    .setTitle(`${def.emoji} ${def.label}`)
    .setDescription(
      `${def.description}\n\n**${def.categories.length}** categories · **${countChannels(def)}** channels · **${def.roles?.length ?? 0}** roles` +
      (isTheme ? '\n\n⚠️ **replace** deletes every current channel first. **add** keeps everything and builds alongside.' : '\n\nthis only adds channels, nothing is deleted.'),
    );
  const row = new ActionRowBuilder();
  if (isTheme) row.addComponents(new ButtonBuilder().setCustomId(`go:${kind}:${def.key}:replace`).setLabel('Replace everything').setEmoji('🧹').setStyle(ButtonStyle.Danger));
  row.addComponents(
    new ButtonBuilder().setCustomId(`go:${kind}:${def.key}:add`).setLabel(isTheme ? 'Add alongside' : 'Add pack').setEmoji('➕').setStyle(ButtonStyle.Success),
    new ButtonBuilder().setCustomId('cancel').setLabel('Cancel').setStyle(ButtonStyle.Secondary),
  );
  return { embeds: [embed], components: [row], content: '' };
}

const reply = (i, payload) => (i.isMessageComponent() ? i.update(payload) : i.reply({ ...payload, flags: EPHEMERAL }));

function needAdmin(i) {
  if (!i.inGuild()) return i.reply({ content: 'use this inside a server.', flags: EPHEMERAL }).then(() => true);
  if (!i.memberPermissions.has(PermissionFlagsBits.Administrator)) return i.reply({ content: 'administrators only.', flags: EPHEMERAL }).then(() => true);
  return Promise.resolve(false);
}

async function onCommand(i) {
  if (await needAdmin(i)) return;
  if (i.commandName === 'setup') return i.reply({ embeds: [setupEmbed()], components: [pickMenu()], flags: EPHEMERAL });
  if (i.commandName === 'addon') return reply(i, confirmPayload('p', packByKey(i.options.getString('pack', true))));
  const theme = byKey(i.commandName);
  if (theme) return reply(i, confirmPayload('t', theme));
}

async function onGo(i) {
  const [, kind, key, mode] = i.customId.split(':');
  const def = resolve(kind, key);
  if (!def) return i.update({ content: 'unknown theme.', embeds: [], components: [] });

  const me = i.guild.members.me;
  const missing = ['ManageChannels', 'ManageRoles', 'SendMessages', 'EmbedLinks'].filter((p) => !me.permissions.has(PermissionFlagsBits[p]));
  if (missing.length) return i.update({ content: `i'm missing permissions: ${missing.join(', ')}. re-invite me with Administrator.`, embeds: [], components: [] });
  if (busy.has(i.guildId)) return i.update({ content: 'a setup is already running in this server.', embeds: [], components: [] });

  busy.add(i.guildId);
  await i.update({ content: `${def.emoji} starting **${def.label}**…`, embeds: [], components: [] });
  let last = 0;
  const onProgress = (msg) => {
    if (Date.now() - last < 2500) return;
    last = Date.now();
    i.editReply({ content: msg }).catch(() => {});
  };
  try {
    const s = await build(i.guild, def, { mode, onProgress });
    const lines = [
      `${def.emoji} **${def.label}** is live.`,
      `🎭 ${s.roles} roles · 📁 ${s.categories} categories · 💬 ${s.channels} channels` + (s.deleted ? ` · 🧹 ${s.deleted} removed` : ''),
    ];
    if (s.warnings.length) lines.push(`\n⚠️ ${s.warnings.length} warning(s):\n` + s.warnings.slice(0, 8).map((w) => `• ${w}`).join('\n'));
    lines.push('\nmove the bot role above the new roles if you want it to assign them.');
    await i.editReply({ content: lines.join('\n').slice(0, 2000) });
  } catch (err) {
    console.error(err);
    await i.editReply({ content: `setup failed: ${err.message}` }).catch(() => {});
  } finally {
    busy.delete(i.guildId);
  }
}

client.on('interactionCreate', async (i) => {
  try {
    if (i.isChatInputCommand()) return await onCommand(i);
    if (i.isStringSelectMenu() && i.customId === 'pick') {
      if (await needAdmin(i)) return;
      const [kind, key] = i.values[0].split(':');
      return await i.update(confirmPayload(kind, resolve(kind, key)));
    }
    if (i.isButton()) {
      if (await needAdmin(i)) return;
      if (i.customId === 'cancel') return await i.update({ content: 'cancelled.', embeds: [], components: [] });
      if (i.customId.startsWith('go:')) return await onGo(i);
    }
  } catch (err) {
    console.error(err);
    const payload = { content: 'something broke, check the console.', flags: EPHEMERAL };
    if (i.replied || i.deferred) i.followUp(payload).catch(() => {});
    else i.reply(payload).catch(() => {});
  }
});

client.once('clientReady', (c) => console.log(`logged in as ${c.user.tag}`));
client.login(process.env.DISCORD_TOKEN);
