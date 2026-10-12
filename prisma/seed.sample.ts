import { PrismaClient } from './generated/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.zbor.createMany({
    data: [
      {
        zbor: 'куќа',
        vid: 'Именка',
        rod: 'женски',
        znacenje: 'Градба наменета за живеење.',
      },
      {
        zbor: 'вода',
        vid: 'Именка',
        rod: 'женски',
        znacenje: 'Безбојна, проѕирна течност што ја пиеме.',
      },
      {
        zbor: 'сонце',
        vid: 'Именка',
        rod: 'среден',
        znacenje: 'Ѕвездата што ја осветлува и загрева Земјата.',
      },
      {
        zbor: 'книга',
        vid: 'Именка',
        rod: 'женски',
        znacenje: 'Пишан или печатен текст со повеќе страници.',
      },
      {
        zbor: 'дете',
        vid: 'Именка',
        rod: 'среден',
        znacenje: 'Човек во раната возраст.',
      },
      {
        zbor: 'дрво',
        vid: 'Именка',
        rod: 'среден',
        znacenje: 'Големо растение со стебло и крошна.',
      },
      {
        zbor: 'трча',
        vid: 'Глагол',
        rod: null,
        znacenje: 'Се движи брзо на нозе.',
      },
      {
        zbor: 'убав',
        vid: 'Придавка',
        rod: null,
        znacenje: 'Што е пријатен за гледање.',
      },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
