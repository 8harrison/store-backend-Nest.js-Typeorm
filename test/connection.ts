import { DataSource } from 'typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const masterConnection = new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: +process.env.MYSQL_PORT,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: ['../dist/**/*.entity{.ts, .js}'],
  logging: false,
  name: 'master',
  migrationsRun: false,
});

const connection = new DataSource({
  ...(masterConnection.options as MysqlConnectionOptions),
  database: 'test_store_db',
  name: undefined,
});

export async function databaseIntegrationSetup() {
  try {
    await masterConnection.initialize();
    await masterConnection.query('CREATE DATABASE test_store_db;');
  } catch (err) {
    process.stderr.write(
      `${err instanceof Error ? err.stack : JSON.stringify(err)}\n`,
    );
    console.log(err);
    process.exit(1);
  }

  return connection;
}

export async function closeDatabaseIntegration() {
  try {
    await masterConnection.query('DROP DATABASE test_store_db;');
    await masterConnection.destroy();
  } catch (err) {
    process.stderr.write(
      `${err instanceof Error ? err.stack : JSON.stringify(err)}\n`,
    );
    console.log(err);
    process.exit(1);
  }
}
