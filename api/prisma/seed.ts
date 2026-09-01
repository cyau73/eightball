import { PrismaClient } from '@prisma/client';
import { SASSY_FORTUNES } from './seed-data';

const prisma = new PrismaClient();

async function main() {
  console.log('🔮 Seeding Sassy 8-Ball fortunes into PostgreSQL...');

  let createdCount = 0;
  for (const item of SASSY_FORTUNES) {
    await prisma.fortune.upsert({
      where: { text: item.text },
      update: {
        intensity: item.intensity,
        category: item.category,
        sentiment: item.sentiment,
        isApproved: true,
      },
      create: {
        text: item.text,
        intensity: item.intensity,
        category: item.category,
        sentiment: item.sentiment,
        isApproved: true,
      },
    });
    createdCount++;
  }

  console.log(`✅ Successfully seeded ${createdCount} sassy fortunes!`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
