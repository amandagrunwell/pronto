import envStore from "@/app/envStore/store";
import { Client } from "pg";

const databaseUrl = envStore.DATABASE_URL as string;
export async function dropAndCreateDatabase() {
  const url = new URL(databaseUrl);
  const dbName = url.pathname.slice(1);

  const client = new Client({
    connectionString: databaseUrl.replace(`/${dbName}`, ""),
  });

  try {
    await client.connect();

    await client.query(
      `SELECT pg_terminate_backend(pg_stat_activity.pid)
          FROM pg_stat_activity
          WHERE pg_stat_activity.datname = $1
          AND pid <> pg_backend_pid();`,
      [dbName]
    );

    // Drop and create the database
    await client.query(`DROP DATABASE IF EXISTS "${dbName}";`);
    await client.query(`CREATE DATABASE "${dbName}";`);
    console.log(`Database ${dbName} dropped and recreated.`);
  } catch (error) {
    console.error("Error dropping and creating database:", error);
    throw error;
  } finally {
    await client.end();
  }
}
