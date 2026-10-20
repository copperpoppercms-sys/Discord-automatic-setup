/*
 * one theme = one slash command (command name = key).
 * sep   : glue between channel emoji and name   -> 🦸┃general
 * wrap  : [left, right] around category names   -> ━━ 🦸 AVENGERS HQ ━━
 * roles : listed top -> bottom (first role ends up highest in the hierarchy)
 */
const { text, news, forum, voice, stage, category, role, PERMS } = require('./dsl');
const { scripts, games } = require('./packs');

const marvel = {
  key: 'marvel',
  emoji: '🦸',
  label: 'Marvel',
  color: 0xed1d24,
  description: 'avengers hq, s.h.i.e.l.d. command, wakanda and asgard voice rooms',
  sep: '┃',
  wrap: ['━━ ', ' ━━'],
  welcome: {
    title: '🦸 Avengers, assemble!',
    description: 'welcome to the base. read the accords, pick your hero and jump into avengers-assemble.',
  },
  rules: [
    'respect every hero. no harassment, no hate.',
    'spoilers go in the spoiler zone. tag them.',
    'no spam, no self-promo, no invite links.',
    'no nsfw, gore or illegal stuff.',
    'villain behaviour (scams, raids, malware) = banned.',
  ],
  roles: [
    role('🛡️ Director Fury', '#f1c40f', { hoist: true, staff: true, perms: PERMS.ADMIN }),
    role('⚡ Avengers', '#ed1d24', { hoist: true, staff: true, mentionable: true, perms: PERMS.MOD }),
    role('🕷️ Heroes', '#3498db', { hoist: true }),
    role('🦹 Villains', '#8e44ad'),
    role('🔔 Announcements', '#e67e22', { mentionable: true }),
  ],
  categories: [
    category('📜', 'WELCOME', [
      text('👋', 'arrival', { readonly: true, post: 'welcome' }),
      text('📜', 'sokovia-accords', { readonly: true, post: 'rules' }),
      news('📢', 'shield-briefings', { readonly: true }),
      text('🎭', 'pick-your-hero', { readonly: true }),
    ]),
    category('🦸', 'AVENGERS HQ', [
      text('💬', 'avengers-assemble', { topic: 'main chat' }),
      text('📸', 'media-vault'),
      text('😂', 'memes-of-asgard'),
      text('🤖', 'friday-bot-commands'),
      text('💡', 'suggestions'),
    ]),
    category('🎬', 'MCU CORNER', [
      text('🎞️', 'movies-and-shows'),
      text('🧠', 'theories-and-leaks'),
      text('📚', 'comics'),
      text('🚨', 'spoiler-zone'),
    ]),
    category('🎮', 'TRAINING ROOM', [
      text('🎮', 'gaming-chat'),
      text('🔍', 'looking-for-squad'),
      text('🏆', 'clips-and-wins'),
    ]),
    category('🔊', 'COMMS', [
      voice('🏙️', 'Avengers Tower'),
      voice('🐆', 'Wakanda', { limit: 10 }),
      voice('🔨', 'Asgard', { limit: 10 }),
      voice('🕸️', 'Queens', { limit: 5 }),
      stage('🎙️', 'Press Conference'),
      voice('🚀', 'Quinjet (AFK)'),
    ]),
    category('🔒', 'SHIELD COMMAND', [
      text('🕵️', 'agents-only'),
      text('📋', 'mission-log'),
      text('🤖', 'jarvis-ops'),
      voice('🛰️', 'Briefing Room'),
    ], { staff: true }),
  ],
};

const dc = {
  key: 'dc',
  emoji: '🦇',
  label: 'DC',
  color: 0x0476f2,
  description: 'justice league watchtower, gotham, themyscira and the batcave staff area',
  sep: '┃',
  wrap: ['▌', ''],
  welcome: { title: '🦇 Welcome to the Watchtower', description: 'justice never sleeps. read the code, grab a role and join the league.' },
  roles: [
    role('🦇 Dark Knight', '#2c3e50', { hoist: true, staff: true, perms: PERMS.ADMIN }),
    role('⚖️ Justice League', '#0476f2', { hoist: true, staff: true, mentionable: true, perms: PERMS.MOD }),
    role('🟢 Green Lanterns', '#2ecc71', { hoist: true }),
    role('🦸 Citizens', '#95a5a6'),
    role('🃏 Rogues', '#9b59b6'),
  ],
  categories: [
    category('🦇', 'WATCHTOWER', [
      text('👋', 'welcome', { readonly: true, post: 'welcome' }),
      text('📜', 'the-code', { readonly: true, post: 'rules' }),
      news('📢', 'daily-planet', { readonly: true }),
      text('🎭', 'choose-your-side', { readonly: true }),
    ]),
    category('🌃', 'GOTHAM CITY', [
      text('💬', 'gotham-general'),
      text('📸', 'media'),
      text('😂', 'joker-memes'),
      text('🤖', 'oracle-bot'),
      text('💡', 'suggestions'),
    ]),
    category('🎬', 'DC UNIVERSE', [
      text('🎞️', 'movies-and-series'),
      text('📚', 'comics'),
      text('🧠', 'theories'),
      text('🎮', 'dc-games'),
    ]),
    category('🏛️', 'THEMYSCIRA', [
      text('🎮', 'gaming'),
      text('🔍', 'lfg'),
      text('🏆', 'clips'),
    ]),
    category('🔊', 'VOICE', [
      voice('🛰️', 'Watchtower'),
      voice('🦇', 'Batcave', { limit: 6 }),
      voice('⚡', 'Central City', { limit: 6 }),
      voice('🔱', 'Atlantis', { limit: 6 }),
      stage('🎙️', 'Daily Planet Live'),
      voice('💤', 'Arkham (AFK)'),
    ]),
    category('🔒', 'BATCAVE', [
      text('🕵️', 'league-only'),
      text('📋', 'case-files'),
      text('🤖', 'alfred-ops'),
      voice('🛠️', 'Cave Briefing'),
    ], { staff: true }),
  ],
};

const professional = {
  key: 'professional',
  emoji: '💼',
  label: 'Professional',
  color: 0x2b6cb0,
  description: 'clean business / team / community server with info, projects, meetings and staff area',
  sep: '・',
  wrap: ['', ''],
  welcome: { title: 'Welcome', description: 'introduce yourself in #introductions and read the guidelines. glad to have you here.' },
  rules: [
    'keep it professional and respectful.',
    'no spam or unsolicited promotion.',
    'confidential info stays private.',
    'use threads for long discussions.',
    'follow staff instructions.',
  ],
  roles: [
    role('👑 Owner', '#c0392b', { hoist: true, staff: true, perms: PERMS.ADMIN }),
    role('🛠️ Admin', '#e67e22', { hoist: true, staff: true, perms: PERMS.ADMIN }),
    role('🛡️ Moderator', '#2980b9', { hoist: true, staff: true, perms: PERMS.MOD }),
    role('👥 Team', '#16a085', { hoist: true }),
    role('✅ Member', '#7f8c8d'),
    role('👤 Guest', '#bdc3c7'),
  ],
  categories: [
    category('📌', 'INFORMATION', [
      text('👋', 'welcome', { readonly: true, post: 'welcome' }),
      text('📜', 'guidelines', { readonly: true, post: 'rules' }),
      news('📢', 'announcements', { readonly: true }),
      text('🧭', 'roles-and-channels', { readonly: true }),
    ]),
    category('💬', 'GENERAL', [
      text('💬', 'general'),
      text('🙋', 'introductions'),
      text('☕', 'off-topic'),
      text('🏆', 'wins-and-milestones'),
      text('📚', 'resources'),
    ]),
    category('🗂️', 'WORK', [
      text('📁', 'projects'),
      text('🧠', 'brainstorming'),
      text('📝', 'feedback'),
      forum('🙏', 'help-and-questions'),
      text('💼', 'jobs-and-opportunities'),
      text('🤝', 'collaboration'),
    ]),
    category('📅', 'MEETINGS', [
      text('📆', 'schedule'),
      text('🗒️', 'meeting-notes'),
      voice('🏢', 'Lobby'),
      voice('📞', 'Meeting Room 1', { limit: 10 }),
      voice('📞', 'Meeting Room 2', { limit: 10 }),
      voice('🎯', 'Focus Room', { limit: 4 }),
      stage('🎤', 'Town Hall'),
    ]),
    category('🔒', 'STAFF', [
      text('🛡️', 'staff-chat'),
      text('📋', 'mod-log'),
      text('🤖', 'bot-commands'),
      voice('🔇', 'Staff Voice'),
    ], { staff: true }),
  ],
};

const gaming = {
  key: 'gaming',
  emoji: '🎮',
  label: 'Gaming',
  color: 0x9b59b6,
  description: 'general chat, a channel per popular game, lfg, clips and squad voice rooms',
  sep: '┃',
  wrap: ['⟦', '⟧'],
  welcome: { title: '🎮 Welcome, player', description: 'grab your roles, find a squad in lfg and drop clips in #clips.' },
  roles: [
    role('👑 Owner', '#f1c40f', { hoist: true, staff: true, perms: PERMS.ADMIN }),
    role('🛡️ Moderator', '#e74c3c', { hoist: true, staff: true, perms: PERMS.MOD }),
    role('🔥 Pro', '#e67e22', { hoist: true }),
    role('🎮 Gamer', '#9b59b6'),
    role('💎 Booster', '#f47fff', { hoist: true }),
  ],
  categories: [
    category('📌', 'START HERE', [
      text('👋', 'welcome', { readonly: true, post: 'welcome' }),
      text('📜', 'rules', { readonly: true, post: 'rules' }),
      news('📢', 'announcements', { readonly: true }),
      text('🎭', 'get-roles', { readonly: true }),
    ]),
    category('💬', 'COMMUNITY', [
      text('💬', 'general-chat', { topic: 'talk about anything' }),
      text('🙋', 'introductions'),
      text('😂', 'memes'),
      text('📸', 'media'),
      text('🤖', 'bot-commands'),
      text('💡', 'suggestions'),
    ]),
    ...games.categories,
    category('🔒', 'STAFF', [
      text('🛡️', 'staff-chat'),
      text('📋', 'mod-log'),
      voice('🔇', 'Staff VC'),
    ], { staff: true }),
  ],
};

const scripthub = {
  key: 'scripthub',
  emoji: '⚡',
  label: 'Script Hub',
  color: 0xf1c40f,
  description: 'main hub, deobfuscation, universal, mm2, superhero arena + 50 roblox game script channels',
  sep: '┃',
  wrap: ['⚡ ', ''],
  welcome: { title: '⚡ Welcome to the Script Hub', description: 'start in #main-hub, read #script-rules, then head to the channel for your game. share working scripts, report broken ones.' },
  roles: [
    role('👑 Owner', '#f1c40f', { hoist: true, staff: true, perms: PERMS.ADMIN }),
    role('🛡️ Moderator', '#e74c3c', { hoist: true, staff: true, perms: PERMS.MOD }),
    role('🧑‍💻 Script Dev', '#2ecc71', { hoist: true }),
    ...scripts.roles,
    role('✅ Verified Poster', '#3498db', { hoist: true }),
    role('⚡ Member', '#95a5a6'),
  ],
  categories: [
    category('📌', 'START HERE', [
      text('👋', 'welcome', { readonly: true, post: 'welcome' }),
      news('📢', 'announcements', { readonly: true }),
      text('🎭', 'get-roles', { readonly: true }),
      text('💬', 'general-chat', { topic: 'talk about anything' }),
      text('🤖', 'bot-commands'),
      voice('🔊', 'General VC'),
    ]),
    ...scripts.categories,
    category('🔒', 'STAFF', [
      text('🛡️', 'staff-chat'),
      text('📋', 'mod-log'),
      text('🚨', 'reported-scripts'),
      voice('🔇', 'Staff VC'),
    ], { staff: true }),
  ],
};

const anime = {
  key: 'anime',
  emoji: '🌸',
  label: 'Anime',
  color: 0xff7eb6,
  description: 'kawaii anime / manga server with seasonal chat, waifu corner, art and watch parties',
  sep: '・',
  wrap: ['｡°✩ ', ' ✩°｡'],
  welcome: { title: '🌸 Irasshaimase!', description: 'welcome to the server. pick your roles, say hi and tell us your favourite anime.' },
  roles: [
    role('🌸 Shogun', '#ff7eb6', { hoist: true, staff: true, perms: PERMS.ADMIN }),
    role('⚔️ Samurai', '#e74c3c', { hoist: true, staff: true, perms: PERMS.MOD }),
    role('🍡 Senpai', '#f39c12', { hoist: true }),
    role('🎌 Otaku', '#9b59b6'),
    role('🐱 Kouhai', '#95a5a6'),
  ],
  categories: [
    category('⛩️', 'TORII GATE', [
      text('👋', 'welcome', { readonly: true, post: 'welcome' }),
      text('📜', 'rules', { readonly: true, post: 'rules' }),
      news('📢', 'announcements', { readonly: true }),
      text('🎭', 'pick-roles', { readonly: true }),
    ]),
    category('🍵', 'TEA HOUSE', [
      text('💬', 'chat'),
      text('🙋', 'introductions'),
      text('😂', 'memes'),
      text('🤖', 'bot-commands'),
      text('📸', 'media'),
    ]),
    category('📺', 'ANIME', [
      text('🌟', 'seasonal-anime'),
      text('📺', 'what-are-you-watching'),
      text('🧠', 'theories-and-spoilers'),
      text('⭐', 'recommendations'),
      text('🏆', 'tier-lists'),
    ]),
    category('📚', 'MANGA', [
      text('📖', 'manga-chat'),
      text('🔥', 'new-chapters'),
      text('📕', 'light-novels'),
    ]),
    category('🎨', 'ART CORNER', [
      text('🖌️', 'fan-art'),
      text('💖', 'waifu-and-husbando'),
      text('🎬', 'amv-and-edits'),
      text('🪭', 'cosplay'),
    ]),
    category('🔊', 'VOICE', [
      voice('🍙', 'Lounge'),
      voice('📺', 'Watch Party'),
      voice('🎮', 'Gaming', { limit: 6 }),
      voice('🎤', 'Karaoke'),
      voice('🌙', 'AFK'),
    ]),
    category('🔒', 'DOJO', [
      text('⚔️', 'mod-chat'),
      text('📋', 'mod-log'),
    ], { staff: true }),
  ],
};

const cyberpunk = {
  key: 'cyberpunk',
  emoji: '🌆',
  label: 'Cyberpunk',
  color: 0x00f0ff,
  description: 'neon night city: netrunners, the net, black market and the afterlife lounge',
  sep: '▸',
  wrap: ['[ ', ' ]'],
  welcome: { title: '🌆 Jack in, choom', description: 'welcome to night city. read the protocol, pick a role and hit the net.' },
  roles: [
    role('🕶️ Fixer', '#ff2a6d', { hoist: true, staff: true, perms: PERMS.ADMIN }),
    role('💀 Solo', '#d1007f', { hoist: true, staff: true, perms: PERMS.MOD }),
    role('🖥️ Netrunner', '#00f0ff', { hoist: true }),
    role('🔧 Techie', '#05d9e8'),
    role('🌃 Nomad', '#7d5ba6'),
  ],
  categories: [
    category('🛰️', 'MAINFRAME', [
      text('🔌', 'jack-in', { readonly: true, post: 'welcome' }),
      text('📜', 'protocol', { readonly: true, post: 'rules' }),
      news('📡', 'broadcasts', { readonly: true }),
      text('🧬', 'pick-your-class', { readonly: true }),
    ]),
    category('🌆', 'NIGHT CITY', [
      text('💬', 'the-afterlife'),
      text('📸', 'neon-gallery'),
      text('😂', 'meme-feed'),
      text('🤖', 'bot-terminal'),
      text('💡', 'suggestions'),
    ]),
    category('🖥️', 'THE NET', [
      text('💾', 'tech-talk'),
      text('🧑‍💻', 'code-dump'),
      text('🛠️', 'builds-and-mods'),
      text('🔓', 'ctf-and-puzzles'),
    ]),
    category('🎮', 'ARCADE', [
      text('🕹️', 'gaming'),
      text('🔍', 'find-a-crew'),
      text('🏆', 'highlights'),
    ]),
    category('🔊', 'VOICE', [
      voice('🍸', 'Afterlife Bar'),
      voice('🏍️', 'Crew 1', { limit: 5 }),
      voice('🏍️', 'Crew 2', { limit: 5 }),
      stage('📻', 'Radio Night City'),
      voice('💤', 'Cryo (AFK)'),
    ]),
    category('🔒', 'BLACK ICE', [
      text('🕶️', 'fixers-only'),
      text('📋', 'incident-log'),
      voice('🔇', 'Dead Drop'),
    ], { staff: true }),
  ],
};

const fantasy = {
  key: 'fantasy',
  emoji: '🐉',
  label: 'Fantasy',
  color: 0xc9a227,
  description: 'medieval kingdom: great hall, tavern, quest board, dragon\'s lair and the war room',
  sep: '・',
  wrap: ['⚔️ ', ' ⚔️'],
  welcome: { title: '🐉 Hail, traveller!', description: 'the gates are open. read the laws of the realm, choose your class and find the tavern.' },
  roles: [
    role('👑 King', '#f1c40f', { hoist: true, staff: true, perms: PERMS.ADMIN }),
    role('🛡️ Knight', '#c0392b', { hoist: true, staff: true, perms: PERMS.MOD }),
    role('🧙 Archmage', '#8e44ad', { hoist: true }),
    role('🏹 Ranger', '#27ae60'),
    role('🗡️ Rogue', '#34495e'),
    role('🌾 Peasant', '#95a5a6'),
  ],
  categories: [
    category('🏰', 'THE GATES', [
      text('📯', 'town-crier', { readonly: true, post: 'welcome' }),
      text('📜', 'laws-of-the-realm', { readonly: true, post: 'rules' }),
      news('📢', 'royal-decrees', { readonly: true }),
      text('🎭', 'choose-your-class', { readonly: true }),
    ]),
    category('🍺', 'THE TAVERN', [
      text('🍻', 'tavern-chat'),
      text('📸', 'gallery'),
      text('😂', 'jesters-corner'),
      text('🤖', 'bot-scroll'),
      text('💡', 'petitions'),
    ]),
    category('🗺️', 'ADVENTURE', [
      text('📌', 'quest-board'),
      text('🎲', 'tabletop-and-dnd'),
      text('📖', 'lore-and-worldbuilding'),
      text('🏆', 'legendary-feats'),
    ]),
    category('🎮', 'ARENA', [
      text('⚔️', 'gaming'),
      text('🔍', 'find-a-party'),
      text('🎬', 'clips'),
    ]),
    category('🔊', 'HALLS', [
      voice('🍺', 'Tavern'),
      voice('🐉', "Dragon's Lair", { limit: 8 }),
      voice('🧝', 'Elven Forest', { limit: 8 }),
      stage('🏛️', 'Royal Court'),
      voice('🛏️', 'Inn (AFK)'),
    ]),
    category('🔒', 'WAR ROOM', [
      text('👑', 'council'),
      text('📋', 'dungeon-log'),
      voice('🕯️', 'Secret Chamber'),
    ], { staff: true }),
  ],
};

const space = {
  key: 'space',
  emoji: '🚀',
  label: 'Space',
  color: 0x5865f2,
  description: 'space station: mission control, observation deck, mars colony and airlock staff area',
  sep: '│',
  wrap: ['🌌 ', ''],
  welcome: { title: '🚀 Welcome aboard', description: 'all systems nominal. check the flight manual, choose a crew role and enter the station.' },
  roles: [
    role('🧑‍🚀 Commander', '#f1c40f', { hoist: true, staff: true, perms: PERMS.ADMIN }),
    role('🛰️ Mission Control', '#3498db', { hoist: true, staff: true, perms: PERMS.MOD }),
    role('🔭 Astronaut', '#9b59b6', { hoist: true }),
    role('🌍 Cadet', '#2ecc71'),
    role('👽 Visitor', '#95a5a6'),
  ],
  categories: [
    category('🛰️', 'LAUNCH PAD', [
      text('👋', 'boarding', { readonly: true, post: 'welcome' }),
      text('📜', 'flight-manual', { readonly: true, post: 'rules' }),
      news('📡', 'transmissions', { readonly: true }),
      text('🎭', 'crew-roles', { readonly: true }),
    ]),
    category('🌌', 'OBSERVATION DECK', [
      text('💬', 'orbit-chat'),
      text('📸', 'astrophotos'),
      text('😂', 'meme-asteroids'),
      text('🤖', 'bot-console'),
      text('💡', 'mission-proposals'),
    ]),
    category('🔭', 'SCIENCE LAB', [
      text('🧪', 'science-talk'),
      text('🪐', 'planets-and-moons'),
      text('🛸', 'ufo-and-aliens'),
      text('📰', 'space-news'),
    ]),
    category('🎮', 'REC ROOM', [
      text('🕹️', 'gaming'),
      text('🔍', 'find-a-crew'),
      text('🏆', 'highlights'),
    ]),
    category('🔊', 'COMMS', [
      voice('🛰️', 'Mission Control'),
      voice('🚀', 'Shuttle 1', { limit: 5 }),
      voice('🚀', 'Shuttle 2', { limit: 5 }),
      voice('🔴', 'Mars Colony', { limit: 8 }),
      stage('🎙️', 'Mission Briefing'),
      voice('💤', 'Cryosleep (AFK)'),
    ]),
    category('🔒', 'AIRLOCK', [
      text('🧑‍🚀', 'command-deck'),
      text('📋', 'flight-log'),
      voice('🔇', 'Black Box'),
    ], { staff: true }),
  ],
};

const starwars = {
  key: 'starwars',
  emoji: '✨',
  label: 'Star Wars',
  color: 0xffe81f,
  description: 'jedi temple, mos eisley cantina, rebel base and the death star staff area',
  sep: '┃',
  wrap: ['◤ ', ' ◥'],
  welcome: { title: '✨ A long time ago…', description: 'welcome to the galaxy. read the jedi code, pick a side and find the cantina.' },
  roles: [
    role('🌌 Grand Master', '#f1c40f', { hoist: true, staff: true, perms: PERMS.ADMIN }),
    role('🔵 Jedi Council', '#3498db', { hoist: true, staff: true, perms: PERMS.MOD }),
    role('🔴 Sith Lords', '#c0392b', { hoist: true }),
    role('🧑‍🚀 Rebels', '#e67e22'),
    role('🤖 Droids', '#95a5a6'),
  ],
  categories: [
    category('🪐', 'JEDI TEMPLE', [
      text('👋', 'holocron', { readonly: true, post: 'welcome' }),
      text('📜', 'jedi-code', { readonly: true, post: 'rules' }),
      news('📡', 'galactic-news', { readonly: true }),
      text('🎭', 'choose-your-side', { readonly: true }),
    ]),
    category('🍺', 'MOS EISLEY CANTINA', [
      text('💬', 'cantina-chat'),
      text('📸', 'media'),
      text('😂', 'meme-droids'),
      text('🤖', 'bot-commands'),
      text('💡', 'suggestions'),
    ]),
    category('🎬', 'THE SAGA', [
      text('🎞️', 'movies-and-series'),
      text('📚', 'books-and-comics'),
      text('🧠', 'theories'),
      text('🚨', 'spoilers'),
    ]),
    category('🎮', 'HOLOGAME', [
      text('🕹️', 'gaming'),
      text('🔍', 'find-a-squadron'),
      text('🏆', 'clips'),
    ]),
    category('🔊', 'HANGARS', [
      voice('🍺', 'Cantina'),
      voice('🔵', 'Jedi Temple', { limit: 8 }),
      voice('🔴', 'Sith Citadel', { limit: 8 }),
      voice('🚀', 'Millennium Falcon', { limit: 4 }),
      stage('🎙️', 'Senate'),
      voice('💤', 'Carbonite (AFK)'),
    ]),
    category('🔒', 'DEATH STAR', [
      text('🛡️', 'council-chamber'),
      text('📋', 'imperial-log'),
      voice('🔇', 'Command Bridge'),
    ], { staff: true }),
  ],
};

const lofi = {
  key: 'lofi',
  emoji: '☕',
  label: 'Lofi Chill',
  color: 0xb8a1ff,
  description: 'cozy minimal hangout: lounge, study room, music, pets and quiet voice rooms',
  sep: '・',
  wrap: ['☁️ ', ''],
  welcome: { title: '☕ Make yourself comfortable', description: 'grab a drink, pick some roles and hang out. no pressure.' },
  roles: [
    role('🌙 Owner', '#b8a1ff', { hoist: true, staff: true, perms: PERMS.ADMIN }),
    role('🍃 Caretaker', '#7fd1ae', { hoist: true, staff: true, perms: PERMS.MOD }),
    role('🍵 Regular', '#f5b971', { hoist: true }),
    role('🧸 Friend', '#f4a6c0'),
  ],
  categories: [
    category('🏡', 'ENTRANCE', [
      text('👋', 'welcome', { readonly: true, post: 'welcome' }),
      text('📜', 'house-rules', { readonly: true, post: 'rules' }),
      news('📢', 'announcements', { readonly: true }),
      text('🎭', 'pick-roles', { readonly: true }),
    ]),
    category('☕', 'LOUNGE', [
      text('💬', 'chill-chat'),
      text('🌧️', 'vent'),
      text('📸', 'daily-photos'),
      text('🐱', 'pets'),
      text('🍜', 'food'),
      text('😂', 'memes'),
      text('🤖', 'bot-commands'),
    ]),
    category('📚', 'STUDY & FOCUS', [
      text('📝', 'study-log'),
      text('🎯', 'goals-and-habits'),
      text('🧠', 'homework-help'),
      voice('📖', 'Study Room 1', { limit: 8 }),
      voice('📖', 'Study Room 2', { limit: 8 }),
    ]),
    category('🎧', 'MUSIC', [
      text('🎵', 'share-a-song'),
      text('🎶', 'playlists'),
      voice('🎧', 'Lofi Radio'),
    ]),
    category('🔊', 'VOICE', [
      voice('☕', 'Cafe'),
      voice('🛋️', 'Couch', { limit: 6 }),
      voice('🎮', 'Game Night', { limit: 8 }),
      voice('🌙', 'Sleepy (AFK)'),
    ]),
    category('🔒', 'BACK ROOM', [
      text('🍃', 'caretakers'),
      text('📋', 'mod-log'),
    ], { staff: true }),
  ],
};

const THEMES = [marvel, dc, professional, gaming, scripthub, anime, cyberpunk, fantasy, space, starwars, lofi];

module.exports = { THEMES, byKey: (k) => THEMES.find((t) => t.key === k) };
