// Racial slurs and highly offensive terms that are never acceptable as usernames.
// Deliberate misspellings and leet-speak variants are included.
const BLOCKED_TERMS = [
  // Racial slurs
  "nigger", "nigga", "nigg", "n1gger", "n1gga",
  "chink", "ch1nk",
  "spic", "sp1c", "spick",
  "kike", "k1ke",
  "wetback",
  "gook",
  "raghead",
  "towelhead",
  "zipperhead",
  "beaner",
  "coon", // matched as whole word only
  "porch monkey",
  "porchmonkey",
  "cracker", // whole word
  "honky",
  "chigger",
  "jigaboo",
  "jiggaboo",
  "nig",
  "darkie",
  "darky",
  "sambo",
  "jungle bunny",
  "junglebunny",
  "sand nigger",
  "sandnigger",
  "pickaninny",
  "redskin",
  "injun",
  "squaw",
  "hymie",
  "heeb",
  "fag",
  "faggot",
  "dyke",
  "tranny",
  "retard",
  "r3tard",
  "sperg",
];

// Terms that should only block when they appear as a whole word (not substrings).
const WHOLE_WORD_ONLY = new Set(["coon", "cracker", "fag", "nig", "sperg"]);

export function containsSlur(input: string): boolean {
  const normalized = input.toLowerCase().replace(/\s+/g, " ").trim();

  for (const term of BLOCKED_TERMS) {
    if (WHOLE_WORD_ONLY.has(term)) {
      const pattern = new RegExp(`\\b${escapeRegex(term)}\\b`);
      if (pattern.test(normalized)) return true;
    } else {
      if (normalized.includes(term)) return true;
    }
  }
  return false;
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
