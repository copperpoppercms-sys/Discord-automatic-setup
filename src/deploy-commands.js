require('dotenv').config();
const { REST, Routes, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { THEMES } = require('./themes');
const { ALL: PACKS } = require('./packs');

const { DISCORD_TOKEN, CLIENT_ID, GUILD_ID } = process.env;
if (!DISCORD_TOKEN || !CLIENT_ID) {
  console.error('set DISCORD_TOKEN and CLIENT_ID in .env');
  process.exit(1);
}

const admin = PermissionFlagsBits.Administrator;

const commands = [
  new SlashCommandBuilder().setName('setup').setDescription('show every theme / pack command and pick one from a menu'),
  ...THEMES.map((t) => new SlashCommandBuilder().setName(t.key).setDescription(`${t.emoji} ${t.description}`.slice(0, 100))),
  new SlashCommandBuilder()
    .setName('wipe')
    .setDescription('delete every channel in the server (optionally the theme roles too)')
    .addBooleanOption((o) => o.setName('roles').setDescription('also delete roles created by themes / packs')),
  new SlashCommandBuilder()
    .setName('addon')
    .setDescription('add an extra block of channels to the current server (nothing gets deleted)')
    .addStringOption((o) =>
      o.setName('pack').setDescription('which pack').setRequired(true)
        .addChoices(...PACKS.map((p) => ({ name: `${p.emoji} ${p.label}`, value: p.key }))),
    ),
].map((c) => c.setDefaultMemberPermissions(admin).setContexts(0).toJSON());

(async () => {
  const rest = new REST().setToken(DISCORD_TOKEN);
  const route = GUILD_ID ? Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID) : Routes.applicationCommands(CLIENT_ID);
  await rest.put(route, { body: commands });
  console.log(`registered ${commands.length} commands ${GUILD_ID ? `in guild ${GUILD_ID}` : 'globally'}`);
})().catch((e) => { console.error(e); process.exit(1); });
