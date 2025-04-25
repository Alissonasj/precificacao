import { exec } from 'child_process';
import { sql } from 'drizzle-orm';
import { database } from '../src/infra/database';

async function truncateTable(table: string) {
  await database.query(sql.raw(`TRUNCATE TABLE ${table}`));
}

async function runDrizzleKitPush() {
  exec('npx drizzle-kit push', (error, stdout, stderr) => {
    if (error) {
      console.error(`Erro ao executar drizzle push: ${error.message}`);
      return;
    }

    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }

    console.log(`stdout: ${stdout}`);
  });
}

const orchestrator = {
  truncateTable,
  runDrizzleKitPush
};

export default orchestrator;
