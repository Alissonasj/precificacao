import { database } from '@/infra/database/database';
import { sql } from 'drizzle-orm';

export async function GET() {
  const serverVersion = await database.query('SHOW server_version;');
  const maxConnections = await database.query('SHOW max_connections;');

  const databaseName = process.env.POSTGRES_DB;
  const openedConnetions = await database.db
    .select({
      value: sql`count('*')`.mapWith(Number)
    })
    .from(sql`pg_stat_activity`)
    .where(sql`datname = ${databaseName}`);
  const openedConnetionsValue = openedConnetions[0].value;

  const updatedDate = new Date().toLocaleString('pt-BR');

  const serverStatus = {
    updated_at: updatedDate,
    server_version: serverVersion.server_version,
    max_connections: maxConnections.max_connections,
    opened_connetions: openedConnetionsValue
  };

  return Response.json(serverStatus);
}
