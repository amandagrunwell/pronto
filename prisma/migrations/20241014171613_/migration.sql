/*
  Warnings:

  - The values [nameCheap] on the enum `accountType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "accountType_new" AS ENUM ('zoho', 'google', 'smtp', 'microsoft');
ALTER TABLE "emailAccounts" ALTER COLUMN "service" TYPE "accountType_new" USING ("service"::text::"accountType_new");
ALTER TYPE "accountType" RENAME TO "accountType_old";
ALTER TYPE "accountType_new" RENAME TO "accountType";
DROP TYPE "accountType_old";
COMMIT;
