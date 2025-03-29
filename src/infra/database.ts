import dotevn from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import 'dotenv/config';
import { SQLWrapper } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import { usersTable } from './database/schemas/userSchema';

dotenvExpand.expand(dotevn.config({ path: '.env.development' }));

const db = drizzle(process.env.POSTGRES_URL!);

async function query(query: SQLWrapper | string) {
  const { rows } = await db.execute(query);

  return rows[0];
}

async function insertUser(user: typeof usersTable.$inferInsert) {
  await db.insert(usersTable).values(user);

  return user;
}

async function getUsers() {
  const users = await db.select().from(usersTable);
  return users;
}

export { getUsers, insertUser, query };
