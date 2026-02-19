import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const search = url.searchParams.get("zbor");

  if (!search) {
    return NextResponse.json(
      { message: "Missing 'zbor' query parameter" },
      { status: 400 }
    );
  }

  const word = await prisma.zbor.findFirst({
    where: {
      zbor: {
        equals: search,
        mode: "insensitive",
      },
      znacenje: {
        not: "",
      },
    },
  });

  if (!word) {
    return NextResponse.json(
      { message: "Word not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(word);
}
