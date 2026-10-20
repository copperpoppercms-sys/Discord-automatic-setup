/*
 * tiny builders for theme data. every channel is { kind, emoji, name, ...opts }.
 * opts: topic, readonly, slow (seconds), limit (voice user cap), post ('welcome' | 'rules' | { title, lines | description })
 * kinds: text, news, forum, voice, stage. news/forum/stage need Community enabled; builder falls back to text/voice.
 */
const text = (emoji, name, o = {}) => ({ kind: 'text', emoji, name, ...o });
const news = (emoji, name, o = {}) => ({ kind: 'news', emoji, name, ...o });
const forum = (emoji, name, o = {}) => ({ kind: 'forum', emoji, name, ...o });
const voice = (emoji, name, o = {}) => ({ kind: 'voice', emoji, name, ...o });
const stage = (emoji, name, o = {}) => ({ kind: 'stage', emoji, name, ...o });

// staff: true -> only staff roles (and the bot) can see the category
const category = (emoji, name, channels, o = {}) => ({ emoji, name, channels, ...o });

// staff: true -> role counts as staff for staff-only categories and readonly-channel posting
const role = (name, color, o = {}) => ({ name, color, ...o });

const PERMS = {
  ADMIN: ['ManageChannels', 'ManageMessages', 'KickMembers', 'BanMembers', 'ModerateMembers', 'ManageNicknames', 'ManageThreads', 'MentionEveryone', 'ViewAuditLog'],
  MOD: ['ManageMessages', 'KickMembers', 'ModerateMembers', 'ManageNicknames', 'ManageThreads', 'ViewAuditLog'],
  HELPER: ['ManageMessages', 'ModerateMembers', 'ManageThreads'],
};

const DEFAULT_RULES = [
  'be respectful. no harassment, hate speech or personal attacks.',
  'no spam, self-promo or invite links unless a channel says otherwise.',
  'keep content in the right channel.',
  'no nsfw, gore or illegal content.',
  'no scams, token grabbers, malware or account theft. instant ban.',
  'listen to staff. if you have a problem, open a ticket or dm a mod.',
];

module.exports = { text, news, forum, voice, stage, category, role, PERMS, DEFAULT_RULES };
