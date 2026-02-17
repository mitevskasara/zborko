export const dynamic = "force-dynamic"; // This disables SSG and ISR

import prisma from "@/lib/prisma";

export default async function Home() {
  const zborovi = await prisma.zbor.findMany({
    orderBy: {
      zbor: "asc",
    }
  });

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl mb-8">
      {JSON.stringify(zborovi)}
    </div>
  );
}
