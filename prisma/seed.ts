import fs from 'fs';
import path from 'path';

import { PrismaClient } from '@prisma/client';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando el script de carga (seed)...');

  await prisma.reservation.deleteMany({});
  await prisma.guest.deleteMany({});
  await prisma.giftItem.deleteMany({});
  console.log('Registros antiguos eliminados.');

  const jsonPath = path.join(__dirname, 'gifts.json');
  const regalosData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

  const result = await prisma.giftItem.createMany({
    data: regalosData,
  });

  console.log(`¡Carga completada! Se insertaron ${result.count} regalos.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });