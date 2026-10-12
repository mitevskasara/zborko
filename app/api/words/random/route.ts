import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * Random word of the day.
 *
 * Running `ORDER BY RANDOM()` on every request sorts the whole filtered table
 * per call. Instead we cache the candidate ids once per server instance and
 * pick one at random, then fetch that single row by primary key.
 */
const CACHE_TTL_MS = 5 * 60 * 1000;

let cachedIds: number[] = [];
let cachedAt = 0;

async function getCandidateIds(): Promise<number[]> {
  const now = Date.now();

  if (cachedIds.length > 0 && now - cachedAt < CACHE_TTL_MS) {
    return cachedIds;
  }

  const rows = await prisma.$queryRaw<{ id: number }[]>`
    SELECT id
    FROM zborovi
    WHERE "random" = true
      AND znacenje IS NOT NULL
      AND btrim(znacenje) <> ''
  `;

  cachedIds = rows.map((row) => row.id);
  cachedAt = now;
  return cachedIds;
}

export async function GET() {
  const ids = await getCandidateIds();

  if (ids.length === 0) {
    return NextResponse.json(
      { message: 'No words available' },
      { status: 404 }
    );
  }

  const id = ids[Math.floor(Math.random() * ids.length)];

  const rows = await prisma.$queryRaw<
    {
      id: number;
      zbor: string;
      vid: string;
      rod: string | null;
      znacenje: string;
    }[]
  >`
    SELECT id, zbor, vid, rod::text AS rod, znacenje
    FROM zborovi
    WHERE id = ${id}
    LIMIT 1
  `;

  return NextResponse.json(rows[0]);
}
