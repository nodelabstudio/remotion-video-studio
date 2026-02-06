import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import pg from 'pg';
const { Pool } = pg;
import { PrismaPg } from '@prisma/adapter-pg';
import { JSONFile } from 'lowdb/node';
import { Low } from 'lowdb';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const connectionString = process.env.DATABASE_URL || "postgresql://angelrodriguez@localhost:5432/remotion_app";
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const dbPath = path.join(__dirname, '../server/db.json');
  console.log(`Reading from ${dbPath}...`);

  const adapter = new JSONFile(dbPath);
  const db = new Low(adapter, { users: [] });
  await db.read();

  const users = db.data.users || [];
  console.log(`Found ${users.length} users to migrate.`);

  for (const user of users) {
    console.log(`Migrating ${user.email}...`);
    try {
      // Check if user exists
      const existing = await prisma.user.findUnique({
        where: { email: user.email }
      });

      if (!existing) {
        await prisma.user.create({
          data: {
            email: user.email,
            password: user.password
          }
        });
        console.log(`  -> Created.`);
      } else {
        console.log(`  -> Already exists. Skipping.`);
      }
    } catch (e) {
      console.error(`  -> Failed: ${e.message}`);
    }
  }

  console.log('Migration complete.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
