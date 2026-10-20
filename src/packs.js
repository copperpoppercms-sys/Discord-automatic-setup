/*
 * packs = standalone blocks. used by /addon (added to the existing server, nothing deleted)
 * and embedded inside themes (scripthub, gaming).
 */
const { text, news, forum, voice, stage, category, role, PERMS } = require('./dsl');

const gs = (emoji, name, topic) => text(emoji, `${name}-scripts`, topic ? { topic } : {});

const scripts = {
  key: 'scripts',
  emoji: '⚡',
  label: 'Script Hub',
  description: 'main hub, deobfuscation, universal + 50 roblox game script channels, help, trading',
  roles: [role('🔓 Deobfuscator', '#1abc9c', { hoist: true, mentionable: true })],
  categories: [
    category('🏠', 'MAIN HUB', [
      text('🏠', 'main-hub', {
        readonly: true,
        topic: 'start here: where everything is',
        post: {
          title: '🏠 Main Hub',
          lines: [
            '🌐 **universal** scripts work in any game. start there.',
            '🔓 **deobfuscation** — post obfuscated lua, get it cleaned up.',
            '🔪 **featured** — mm2, superhero arena and the most requested games.',
            '🎮 **game scripts** — one channel per game, 50+ of them.',
            '🆘 **support** — script help forum, bug reports and tutorials.',
            '📜 read #script-rules before posting anything.',
          ],
        },
      }),
      text('📜', 'script-rules', {
        readonly: true,
        post: {
          title: '📜 Script rules',
          lines: [
            'post the script AND what it does + which executor it works on.',
            'no token loggers, cookie grabbers, backdoors or anything that steals accounts. instant ban.',
            'no links to paid/scam "key" sites. report them instead.',
            'post in the channel that matches the game. universal goes in universal.',
            'use scripts at your own risk. staff can not help with account bans.',
          ],
        },
      }),
      news('📢', 'script-updates', { readonly: true, topic: 'patches, executor updates and broken scripts' }),
      text('🆕', 'new-scripts', { topic: 'fresh drops' }),
      text('⭐', 'script-of-the-day', { readonly: true }),
      text('🏆', 'showcase', { topic: 'show what you made or got working' }),
    ]),
    category('🔓', 'DEOBFUSCATION', [
      text('📥', 'deobfuscate-requests', { topic: 'post the obfuscated script + the obfuscator if you know it' }),
      text('📤', 'deobfuscated-scripts', { topic: 'finished results' }),
      text('🧰', 'deobf-tools', { topic: 'tools, decompilers, beautifiers, unpackers' }),
      text('🧩', 'obfuscators', { topic: 'luraph, ironbrew, moonsec, prometheus and friends: how they work' }),
      text('🔍', 'script-analysis', { topic: 'reading what a script really does before you run it' }),
      text('🧑‍🏫', 'deobf-tutorials'),
      voice('🔊', 'Deobf VC'),
    ]),
    category('🌐', 'UNIVERSAL', [
      text('🌐', 'universal-scripts', { topic: 'scripts that work in any game' }),
      text('🛠️', 'admin-and-utility', { topic: 'admin tools and utilities' }),
      text('🎯', 'aimbot-and-esp'),
      text('🏃', 'movement-scripts', { topic: 'fly, speed, noclip, teleport' }),
      text('🔑', 'keyless-scripts', { topic: 'scripts with no key system' }),
      text('🧰', 'executors', { topic: 'executor talk, status and recommendations' }),
      text('🧪', 'script-requests', { topic: 'ask for a script, or take someone\'s request' }),
      text('✅', 'working-scripts', { topic: 'confirmed working right now' }),
      text('🐛', 'broken-scripts', { topic: 'patched or broken scripts' }),
    ]),
    category('🔪', 'FEATURED GAMES', [
      gs('🔪', 'mm2', 'murder mystery 2: esp, auto farm, coin farm'),
      text('🎒', 'mm2-trading', { topic: 'godlys, chromas, ancients' }),
      text('💬', 'mm2-chat'),
      gs('🦸', 'superhero-arena'),
      gs('🍎', 'blox-fruits'),
      gs('🐾', 'pet-sim-99'),
      gs('🐶', 'adopt-me'),
      gs('🌱', 'grow-a-garden'),
      gs('🧠', 'steal-a-brainrot'),
      gs('🌲', '99-nights-in-the-forest'),
      gs('🚪', 'doors'),
      gs('🎣', 'fisch'),
    ]),
    category('⚔️', 'FIGHTING GAMES', [
      gs('🥊', 'da-hood'),
      gs('💥', 'the-strongest-battlegrounds'),
      gs('🦸', 'heroes-battlegrounds'),
      gs('🏐', 'blade-ball'),
      gs('👏', 'slap-battles'),
      gs('🗡️', 'type-soul'),
      gs('😈', 'project-slayers'),
      gs('🔥', 'shindo-life'),
      gs('🐉', 'dragon-ball-rage'),
      gs('👑', 'king-legacy'),
      gs('⚽', 'blue-lock-rivals'),
      gs('🥋', 'combat-warriors'),
    ]),
    category('🔫', 'SHOOTERS', [
      gs('🔫', 'arsenal'),
      gs('🏆', 'rivals'),
      gs('🪖', 'phantom-forces'),
      gs('💼', 'bad-business'),
      gs('🎯', 'counter-blox'),
      gs('🔥', 'strucid'),
      gs('🪂', 'the-wild-west'),
      gs('🔪', 'murderers-vs-sheriffs'),
    ]),
    category('🐾', 'SIMULATORS & TYCOONS', [
      gs('🐾', 'pet-simulator-x'),
      gs('🐝', 'bee-swarm-simulator'),
      gs('🪵', 'lumber-tycoon-2'),
      gs('🚢', 'build-a-boat'),
      gs('🍕', 'work-at-a-pizza-place'),
      gs('🎰', 'sols-rng'),
      gs('⛏️', 'mining-simulator'),
      gs('🧪', 'bubble-gum-simulator'),
      gs('🏋️', 'muscle-legends'),
      gs('🏝️', 'islands'),
    ]),
    category('🎌', 'ANIME & TOWER DEFENSE', [
      gs('🎌', 'anime-defenders'),
      gs('🌀', 'anime-adventures'),
      gs('🛡️', 'anime-last-stand'),
      gs('🌟', 'all-star-tower-defense'),
      gs('🗼', 'tower-defense-simulator'),
      gs('🍥', 'anime-vanguards'),
    ]),
    category('🧟', 'SURVIVAL, HORROR & ROLEPLAY', [
      gs('🧟', 'dead-rails'),
      gs('🔪', 'survive-the-killer'),
      gs('🏭', 'flee-the-facility'),
      gs('🐷', 'piggy'),
      gs('🌪️', 'natural-disaster-survival'),
      gs('👾', 'evade'),
      gs('🚓', 'jailbreak'),
      gs('🏠', 'brookhaven'),
      gs('🏙️', 'mad-city'),
      gs('👑', 'royale-high'),
      gs('🕺', 'funky-friday'),
      gs('🗼', 'tower-of-hell'),
      gs('🛏️', 'bedwars'),
      gs('🏠', 'break-in'),
      gs('🎮', 'other-game'),
    ]),
    category('🆘', 'SCRIPT SUPPORT', [
      forum('❓', 'script-help', { topic: 'one post per problem. include executor + error.' }),
      text('📖', 'tutorials-and-guides'),
      text('🧑‍💻', 'script-dev', { topic: 'lua, luau, hooks, remotes. for people writing their own' }),
      text('🐛', 'bug-reports'),
      text('💡', 'suggestions'),
      voice('🔊', 'Script Help VC'),
    ]),
    category('💱', 'TRADING & VOUCHES', [
      text('💱', 'trade-offers', { slow: 30 }),
      text('✅', 'vouches'),
      text('🚨', 'scam-reports'),
    ]),
  ],
};

const games = {
  key: 'games',
  emoji: '🎮',
  label: 'Games Hub',
  description: 'a channel per popular game, lfg, clips and squad voice channels',
  categories: [
    category('🎮', 'PC & CONSOLE', [
      text('⛏️', 'minecraft'),
      text('🪂', 'fortnite'),
      text('🎯', 'valorant'),
      text('💣', 'counter-strike'),
      text('🦊', 'apex-legends'),
      text('🪖', 'call-of-duty'),
      text('⚔️', 'league-of-legends'),
      text('🚗', 'gta-online'),
      text('🏎️', 'rocket-league'),
      text('🛡️', 'overwatch'),
      text('🧟', 'other-games'),
    ]),
    category('🧱', 'ROBLOX', [
      text('🧱', 'roblox-general'),
      text('🍎', 'blox-fruits'),
      text('🐶', 'adopt-me'),
      text('🔪', 'murder-mystery-2'),
      text('🐾', 'pet-simulator'),
      text('🌱', 'grow-a-garden'),
    ]),
    category('📱', 'MOBILE', [
      text('⭐', 'brawl-stars'),
      text('👑', 'clash-royale'),
      text('🌌', 'genshin-impact'),
      text('📲', 'other-mobile'),
    ]),
    category('🤝', 'LOOKING FOR GROUP', [
      text('🖥️', 'lfg-pc'),
      text('🎮', 'lfg-console'),
      text('📱', 'lfg-mobile'),
      text('📈', 'ranked-grind'),
    ]),
    category('🏆', 'CLIPS & SHOWOFF', [
      text('🎬', 'clips'),
      text('📸', 'screenshots'),
      text('🤣', 'funny-moments'),
      text('🥇', 'achievements'),
    ]),
    category('🔊', 'SQUAD VOICE', [
      voice('🎧', 'Squad 1', { limit: 5 }),
      voice('🎧', 'Squad 2', { limit: 5 }),
      voice('🎧', 'Squad 3', { limit: 5 }),
      voice('👥', 'Duo 1', { limit: 2 }),
      voice('👥', 'Duo 2', { limit: 2 }),
      voice('🛋️', 'Chill Lounge'),
      voice('💤', 'AFK'),
    ]),
  ],
};

const music = {
  key: 'music',
  emoji: '🎵',
  label: 'Music',
  description: 'music chat, bot commands, listening rooms and producer corner',
  categories: [
    category('🎵', 'MUSIC', [
      text('🎶', 'music-chat'),
      text('🤖', 'music-bot-commands'),
      text('🎧', 'now-playing'),
      text('💿', 'album-reviews'),
      text('🎤', 'producer-corner', { topic: 'beats, mixing, samples, feedback' }),
      voice('🎵', 'Listening Room 1'),
      voice('🎵', 'Listening Room 2'),
      voice('🎤', 'Karaoke'),
    ]),
  ],
};

const creative = {
  key: 'creative',
  emoji: '🎨',
  label: 'Creative',
  description: 'art, edits, memes, showcase and feedback channels',
  categories: [
    category('🎨', 'CREATIVE', [
      text('🖼️', 'art-showcase'),
      text('🎬', 'video-edits'),
      text('🧠', 'design-feedback'),
      text('😂', 'memes'),
      text('📸', 'photography'),
      text('✍️', 'writing'),
      text('💡', 'inspiration'),
      voice('🎨', 'Art Stream'),
    ]),
  ],
};

const trading = {
  key: 'trading',
  emoji: '💱',
  label: 'Trading',
  description: 'trade posts, middleman requests, vouches and scam reports',
  categories: [
    category('💱', 'TRADING', [
      text('📜', 'trading-rules', {
        readonly: true,
        post: {
          title: '💱 Trading rules',
          lines: [
            'always use a middleman for high value trades.',
            'no scamming, no fake proof, no "trust me" trades.',
            'post what you have and what you want, nothing else.',
            'vouches go in the vouch channel only after a finished trade.',
          ],
        },
      }),
      text('💱', 'trade-offers', { slow: 30 }),
      text('🔍', 'looking-for'),
      text('🛡️', 'middleman-requests'),
      text('✅', 'vouches'),
      text('🚨', 'scam-reports'),
    ]),
  ],
};

const support = {
  key: 'support',
  emoji: '🎫',
  label: 'Support',
  description: 'faq, help forum, bug reports, suggestions and appeals',
  categories: [
    category('🎫', 'SUPPORT', [
      text('❔', 'faq', { readonly: true }),
      forum('🆘', 'help-desk', { topic: 'one post per problem' }),
      text('🐛', 'bug-reports'),
      text('💡', 'suggestions'),
      text('⚖️', 'ban-appeals'),
      text('📣', 'report-a-user'),
    ]),
  ],
};

const staff = {
  key: 'staff',
  emoji: '🔒',
  label: 'Staff Area',
  description: 'private staff chat, mod log, bot ops and a staff voice room',
  roles: [role('🛡️ Staff', '#e74c3c', { hoist: true, staff: true, mentionable: true, perms: PERMS.MOD })],
  categories: [
    category('🔒', 'STAFF AREA', [
      text('🕵️', 'staff-chat'),
      text('📋', 'mod-log'),
      text('🤖', 'bot-ops'),
      text('📌', 'staff-notes'),
      voice('🔇', 'Staff Room'),
    ], { staff: true }),
  ],
};

const events = {
  key: 'events',
  emoji: '🎉',
  label: 'Events',
  description: 'giveaways, tournaments, polls, stage and event announcements',
  categories: [
    category('🎉', 'EVENTS', [
      news('📅', 'event-announcements', { readonly: true }),
      text('🎁', 'giveaways', { readonly: true }),
      text('🏆', 'tournaments'),
      text('📊', 'polls'),
      text('🏅', 'winners', { readonly: true }),
      stage('🎙️', 'Event Stage'),
      voice('🎉', 'Event Lobby'),
    ]),
  ],
};

const ALL = [scripts, games, music, creative, trading, support, staff, events];

module.exports = { scripts, games, music, creative, trading, support, staff, events, ALL };
