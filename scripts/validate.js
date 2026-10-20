// offline sanity check of all theme / pack data against discord limits. run: npm test
const { PermissionFlagsBits } = require('discord.js');
const { THEMES } = require('../src/themes');
const { ALL: PACKS } = require('../src/packs');

const errs = [];
const bad = (m) => errs.push(m);
const KINDS = ['text', 'news', 'forum', 'voice', 'stage'];
const norm = (s) => s.toLowerCase().replace(/\s+/g, '-');

const keys = new Set(['setup', 'addon']);
for (const d of [...THEMES, ...PACKS]) {
  if (!/^[a-z0-9_-]{1,32}$/.test(d.key)) bad(`${d.key}: bad key`);
  if (d.description.length > 90) bad(`${d.key}: description too long (${d.description.length})`);
  if (THEMES.includes(d)) {
    if (keys.has(d.key)) bad(`${d.key}: duplicate command`);
    keys.add(d.key);
  }
  if (d.categories.length > 50) bad(`${d.key}: >50 categories`);
  if ((d.roles?.length ?? 0) > 40) bad(`${d.key}: lots of roles`);
  const seen = new Set();
  let total = 0;
  for (const r of d.roles ?? []) {
    if (r.color && !/^#[0-9a-f]{6}$/i.test(r.color)) bad(`${d.key}/${r.name}: bad color`);
    for (const p of r.perms ?? []) if (!(p in PermissionFlagsBits)) bad(`${d.key}/${r.name}: unknown perm ${p}`);
  }
  const hasStaffRole = (d.roles ?? []).some((r) => r.staff);
  for (const c of d.categories) {
    if (c.channels.length > 50) bad(`${d.key}/${c.name}: >50 channels`);
    if (c.staff && THEMES.includes(d) && !hasStaffRole) bad(`${d.key}/${c.name}: staff category without staff role`);
    for (const ch of c.channels) {
      total++;
      if (!KINDS.includes(ch.kind)) bad(`${d.key}/${ch.name}: kind ${ch.kind}`);
      const n = norm(`${ch.emoji}${d.sep ?? '┃'}${ch.name}`);
      if (n.length > 100) bad(`${d.key}/${ch.name}: name too long`);
      if (seen.has(n)) bad(`${d.key}: duplicate channel ${n}`);
      seen.add(n);
      if ((ch.topic?.length ?? 0) > 1024) bad(`${d.key}/${ch.name}: topic too long`);
    }
  }
  if (total > 500) bad(`${d.key}: >500 channels`);
  console.log(`${d.key.padEnd(13)} ${String(d.categories.length).padStart(2)} categories ${String(total).padStart(3)} channels ${String(d.roles?.length ?? 0).padStart(2)} roles`);
}
if (THEMES.length + PACKS.length > 25) bad('select menu overflow (>25 options)');
if (errs.length) { console.error('\n' + errs.join('\n')); process.exit(1); }
console.log('\nall good');
