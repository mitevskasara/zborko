import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import {
  escapeLikePattern,
  MIN_HEADWORD_LENGTH,
  MIN_PREFIX_MATCH_LENGTH,
  pickBestRow,
  type MatchKind,
  type ZborRow,
} from '@/lib/word-match';

const SIMILAR_LIMIT = 5;

/**
 * Upper bound on the input term. The DB normalizes with lower(), so unbounded
 * input would let a single request do O(n) work on an arbitrary-size string.
 */
const MAX_TERM_LENGTH = 100;

type Match = { kind: MatchKind; rows: ZborRow[] };

/**
 * Case-insensitive exact lookup.
 *
 * Deliberately not Prisma's `{ equals, mode: "insensitive" }`: that emits
 * ILIKE with the value inlined as a literal, so a term containing % or _
 * matches every row. `lower() =` is parameterized and treats the term literally.
 */
async function findExact(term: string): Promise<ZborRow[]> {
  return prisma.$queryRaw<ZborRow[]>`
    SELECT id, zbor, vid, rod::text AS rod, znacenje, random
    FROM zborovi
    WHERE btrim(znacenje) <> ''
      AND lower(zbor) = lower(${term})
    LIMIT 20
  `;
}

/**
 * Dictionary headword is a prefix of the query: "racisticki" -> "rasist".
 * Longest headword wins, so a more specific entry beats a stub.
 */
async function findPrefixOfQuery(term: string): Promise<ZborRow[]> {
  return prisma.$queryRaw<ZborRow[]>`
    SELECT id, zbor, vid, rod::text AS rod, znacenje, random
    FROM zborovi
    WHERE btrim(znacenje) <> ''
      AND char_length(lower(zbor)) >= ${MIN_PREFIX_MATCH_LENGTH}
      AND lower(${term}) LIKE lower(zbor) || '%'
    ORDER BY char_length(lower(zbor)) DESC, id ASC
    LIMIT 20
  `;
}

/**
 * Query is a prefix of dictionary headwords: "mak" -> "makedonija", "makon".
 * Shortest headword wins as the closest guess.
 */
async function findQueryIsPrefix(term: string): Promise<ZborRow[]> {
  const pattern = `${escapeLikePattern(term.toLowerCase())}%`;

  return prisma.$queryRaw<ZborRow[]>`
    SELECT id, zbor, vid, rod::text AS rod, znacenje, random
    FROM zborovi
    WHERE btrim(znacenje) <> ''
      AND char_length(lower(zbor)) >= ${MIN_HEADWORD_LENGTH}
      AND lower(zbor) LIKE ${pattern} ESCAPE '\'
    ORDER BY char_length(lower(zbor)) ASC, id ASC
    LIMIT 20
  `;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const search = url.searchParams.get('zbor');

  if (!search) {
    return NextResponse.json(
      { message: "Missing 'zbor' query parameter" },
      { status: 400 }
    );
  }

  const term = search.trim();

  if (term.length === 0) {
    return NextResponse.json(
      { message: "Missing 'zbor' query parameter" },
      { status: 400 }
    );
  }

  if (term.length > MAX_TERM_LENGTH) {
    return NextResponse.json(
      { message: `'zbor' must be at most ${MAX_TERM_LENGTH} characters` },
      { status: 400 }
    );
  }

  const exact = await findExact(term);

  let match: Match;
  if (exact.length > 0) {
    match = { kind: 'exact', rows: exact };
  } else {
    const shorterHeadword = await findPrefixOfQuery(term);

    if (shorterHeadword.length > 0) {
      match = { kind: 'prefix-of-query', rows: shorterHeadword };
    } else {
      const longerHeadword = await findQueryIsPrefix(term);

      match =
        longerHeadword.length > 0
          ? { kind: 'query-is-prefix', rows: longerHeadword }
          : { kind: 'exact', rows: [] };
    }
  }

  const best = pickBestRow(match.rows);

  if (!best) {
    return NextResponse.json(
      { message: 'Word not found', similarWords: [] },
      { status: 404 }
    );
  }

  const seen = new Set<string>([best.zbor.toLowerCase()]);

  const similarWords = match.rows
    .filter((row) => {
      const key = row.zbor.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, SIMILAR_LIMIT)
    .map((row) => ({ zbor: row.zbor, vid: row.vid }));

  return NextResponse.json({
    ...best,
    match: match.kind,
    similarWords,
  });
}
