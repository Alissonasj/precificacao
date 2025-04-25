import { exec } from 'node:child_process';

function checkPostgres() {
  exec(
    'docker exec postgres-precificacao pg_isready --host localhost',
    handleReturn
  );

  function handleReturn(error, stdout) {
    if (stdout.search('accepting connections') === -1) {
      process.stdout.write('.');
      checkPostgres();
      return;
    }

    process.stdout.write('\n\nO Postgres está aceitando conexões\n\n');
  }
}

process.stdout.write('\n\nAguardando Postgres aceitar conexões\n\n');
checkPostgres();
