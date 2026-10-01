export type MatchKind = "exact" | "prefix-of-query" | "query-is-prefix";

export type ZborRow = {
  id: number;
  zbor: string;
  vid: string;
  rod: string | null;
  znacenje: string;
  random: boolean;
};

export const MIN_HEADWORD_LENGTH = 3;

/**
 * Below this length a prefix match is too ambiguous to guess from: "сме" would
 * otherwise resolve to the stub headword "сме" rather than reporting no match.
 */
export const MIN_PREFIX_MATCH_LENGTH = 4;

/**
 * Escapes LIKE metacharacters so a user-supplied term can be used as a
 * literal pattern on the right-hand side of LIKE.
 */
export function escapeLikePattern(value: string): string {
  return value.replace(/([\\%_])/g, "\\$1");
}

/**
 * Picks the best dictionary row for a headword.
 *
 * Duplicate headwords exist in the data (1330 of them), so ordering must be
 * explicit or the returned row is non-deterministic. Preference order:
 * tagged part of speech, then longest definition, then lowest id.
 */
export function pickBestRow(rows: ZborRow[]): ZborRow | null {
  if (rows.length === 0) return null;

  return [...rows].sort((a, b) => {
    const tagged = Number(b.vid.trim() !== "") - Number(a.vid.trim() !== "");
    if (tagged !== 0) return tagged;

    const byLength = b.znacenje.length - a.znacenje.length;
    if (byLength !== 0) return byLength;

    return a.id - b.id;
  })[0];
}
