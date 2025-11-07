import 'dotenv/config';

import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();

async function main() {
    console.log('Iniciando el script de carga (seed)...');

    await prisma.giftItem.deleteMany({});
    console.log('Registros antiguos de regalos eliminados.');

    const jsonPath = path.join(__dirname, 'gifts.json');
    const regalosData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

    const result = await prisma.giftItem.createMany({
        data: regalosData,
        skipDuplicates: true,
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