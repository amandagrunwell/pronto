import { NextResponse } from "next/server";
import { dropAndCreateDatabase } from "../helper";
import envStore from "@/app/envStore/store";
import util from "util";
import { exec } from "child_process";

const databaseUrl = envStore.DATABASE_URL as string;
const execPromise = util.promisify(exec);
export const restoreDatabase = async (req: Request, res: Response) => {
  try {
    const dumpFilePath = "bec.sql";
    if (!dumpFilePath) {
      return NextResponse.json({
        status: 400,
        message: "Dump file path is required.",
      });
    }

    // Drop and recreate the database before restoring
    await dropAndCreateDatabase();

    // Use pg_restore for restoring custom-format dump
    const command = `pg_restore -d ${databaseUrl} ${dumpFilePath}`;

    await execPromise(command);
    return NextResponse.json({
      status: 200,
      message: "Database backup completed successfully.",
    });
  } catch (error) {
    console.error("Error during database restore:", error);
    return NextResponse.json({
      status: 500,
      message: "Error during database backup.",
    });
  }
};
