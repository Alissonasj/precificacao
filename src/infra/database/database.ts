import dotevn from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import 'dotenv/config';
import { SQLWrapper } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';

dotenvExpand.expand(dotevn.config({ path: '.env.development' }));

const client = drizzle({
  connection: process.env.POSTGRES_URL!,
  casing: 'snake_case'
});

async function query(query: SQLWrapper | string) {
  const { rows } = await client.execute(query);

  return rows[0];
}

const database = {
  query,
  client
};

export { database };
