/*
 * packs = standalone blocks. used by /addon (added to the existing server, nothing deleted)
 * and embedded inside themes (scripthub, gaming).
 */
const { text, news, forum, voice, stage, category, role, PERMS } = require('./dsl');

const scripts = {
  key: 'scripts',
  emoji: '⚡',
  label: 'Script Hub',
  description: 'universal scripts, mm2, blox fruits, adopt me, pet sim and more roblox script channels',
  categories: [
    category('📜', 'SCRIPT RULES', [
      text('📜', 'script-rules', {
        readonly: true,
        post: {
          title: '📜 Script rules',
          lines: [
            'post the script AND what it does + which executor it works on.',
            'no token loggers, cookie grabbers, backdoors or anything that steals accounts. instant ban.',
            'no links to paid/scam "key" sites. report them instead.',
            'use the game channel that matches your script. universal goes in universal.',
            'use scripts at your own risk. staff can not help with account bans.',
          ],
        },
      }),
      news('📢', 'script-updates', { readonly: true, topic: 'patches, executor updates and broken scripts' }),
    ]),
    category('🌐', 'UNIVERSAL SCRIPTS', [
      text('🌐', 'universal-scripts', { topic: 'scripts that work in any game' }),
      text('🛠️', 'admin-and-utility', { topic: 'infinite yield style admin tools and utilities' }),
      text('🧰', 'executors', { topic: 'executor talk, status and recommendations' }),
      text('🔑', 'keyless-scripts', { topic: 'scripts with no key system' }),
      text('🧪', 'script-requests', { topic: 'ask for a script, or take someone\'s request' }),
      text('✅', 'working-scripts', { topic: 'confirmed working right now' }),
      text('🐛', 'broken-scripts', { topic: 'patched or broken scripts' }),
    ]),
    category('🔪', 'MURDER MYSTERY 2', [
      text('🔪', 'mm2-scripts', { topic: 'mm2 scripts: esp, auto farm, coin farm' }),
      text('🎒', 'mm2-trading', { topic: 'godlys, chromas, ancients' }),
      text('💬', 'mm2-chat'),
      text('🏆', 'mm2-clips'),
    ]),
    category('🎮', 'ROBLOX GAME SCRIPTS', [
      text('🍎', 'blox-fruits-scripts'),
      text('🐾', 'pet-sim-99-scripts'),
      text('🐶', 'adopt-me-scripts'),
      text('🌱', 'grow-a-garden-scripts'),
      text('🚪', 'doors-scripts'),
      text('🔫', 'arsenal-scripts'),
      text('🚓', 'jailbreak-scripts'),
      text('🏠', 'brookhaven-scripts'),
      text('🗼', 'tower-of-hell-scripts'),
      text('🥊', 'da-hood-scripts'),
      text('🎣', 'fisch-scripts'),
      text('🧠', 'other-game-scripts', { topic: 'any game not listed above' }),
    ]),
    category('🆘', 'SCRIPT SUPPORT', [
      forum('❓', 'script-help', { topic: 'one post per problem. include executor + error.' }),
      text('📖', 'tutorials-and-guides'),
      text('🧑‍💻', 'script-dev', { topic: 'lua, luau, hooks, remotes. for people writing their own' }),
      voice('🔊', 'Script Help VC'),
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
