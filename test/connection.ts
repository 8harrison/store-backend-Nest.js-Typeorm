import { DataSource } from 'typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const masterConnection = new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: +process.env.MYSQL_PORT,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: ['./**/*.entity.ts'],
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
    console.log(err);
  }

  return connection;
}

export async function closeDatabaseIntegration() {
  try {
    await masterConnection.query('DROP DATABASE test_store_db;');
    await masterConnection.destroy();
  } catch (err) {
    console.log(err);
  }
}
