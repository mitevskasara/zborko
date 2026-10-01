import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const randomWord = await prisma.$queryRaw<
    { id: number; zbor: string; znacenje: string }[]
  >`
    SELECT *
    FROM zborovi
    WHERE "random" = true
      AND znacenje IS NOT NULL
      AND znacenje != ''
    ORDER BY RANDOM()
    LIMIT 1;
  `;

  return NextResponse.json(randomWord[0]);
}
