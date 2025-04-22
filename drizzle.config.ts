import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

dotenvExpand.expand(dotenv.config({ path: '.env.development' }));

export default defineConfig({
  out: './drizzle',
  schema: './src/infra/schemas/*',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
    ssl: false
  }
});
