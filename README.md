# Discord-automatic-setup

discord bot that builds a whole themed server from one slash command: roles, sorted emoji categories, channels, voice rooms, welcome + rules embeds.

## commands

| command | what it does |
|---|---|
| `/setup` | lists every theme and pack, with a menu to pick one |
| `/marvel` `/dc` `/professional` `/gaming` `/scripthub` `/anime` `/cyberpunk` `/fantasy` `/space` `/starwars` `/lofi` | apply a theme. choose **Replace everything** (wipes channels first) or **Add alongside** |
| `/wipe` (`roles:true` optional) | deletes every channel and category, optionally the theme roles too, leaves an empty general channel |
| `/addon pack:<name>` | add a block to the current server, deletes nothing: `scripts` `games` `music` `creative` `trading` `support` `staff` `events` |

admin only. re-running a command never duplicates channels that already exist. roles are never deleted.

## run

```bash
npm install
cp .env.example .env     # fill DISCORD_TOKEN + CLIENT_ID (+ GUILD_ID for instant commands)
npm run deploy           # register slash commands
npm start
```

invite the bot with the `bot` + `applications.commands` scopes and the **Administrator** permission (it needs Manage Channels + Manage Roles at minimum, and its role must sit above the roles it creates).

news / forum / stage channels need Community enabled; without it they fall back to normal text / voice channels.

## add a theme or pack

edit `src/themes.js` or `src/packs.js` using the helpers in `src/dsl.js`, add it to `THEMES` / `ALL`, run `npm test` (checks discord limits) and `npm run deploy`.
