import envStore from "@/app/envStore/store";
import { NextResponse } from "next/server";
import * as dotenv from "dotenv";
import util from "util";
import { exec } from "child_process";

dotenv.config();

const execPromise = util.promisify(exec);
const databaseUrl = envStore.DATABASE_URL as string;
export async function POST(request: Request) {
  try {
    const backupFilePath = `bec.sql`;
    const command = `pg_dump ${databaseUrl} -F c > ${backupFilePath}`;

    await execPromise(command);
    return NextResponse.json({
      status: 200,
      message: "Database backup completed successfully.",
    });
  } catch (error) {
    console.error("Error during database backup:", error);
    return NextResponse.json({
      status: 500,
      message: "Error during database backup.",
    });
  }
}
