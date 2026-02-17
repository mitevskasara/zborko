"use server";

import prisma from "@/lib/prisma";

/**
 * Checks if the zbor table exists in the database
 * @returns Promise<boolean> - true if the table exists, false otherwise
 */
export async function checkZborTableExists(): Promise<boolean> {
  try {
    await prisma.zbor.findFirst();
    return true;
  } catch (error) {
    return false;
  }
}
