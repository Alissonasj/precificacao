import { sql } from 'drizzle-orm';
import { spawn } from 'node:child_process';
import { database } from '../src/app/(backend)/infra/database';

async function truncateTable(table: string) {
  await database.query(sql.raw(`TRUNCATE TABLE ${table}`));
}

async function runDrizzleKitPush() {
  return new Promise<void>((resolve, reject) => {
    const child = spawn('npm', ['run', 'drizzle:push'], {
      stdio: 'overlapped',
      shell: true
    });

    child.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`drizzle:push exited with code ${code}`));
    });

    child.on('error', reject);
  });
}

const orchestrator = {
  truncateTable,
  runDrizzleKitPush
};

export default orchestrator;
