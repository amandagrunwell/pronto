/*
  Warnings:

  - You are about to drop the column `dkimPath` on the `emailAccounts` table. All the data in the column will be lost.
  - You are about to drop the column `isDkim` on the `emailAccounts` table. All the data in the column will be lost.
  - You are about to drop the column `primaryEmail` on the `emailAccounts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "emailAccounts" DROP COLUMN "dkimPath",
DROP COLUMN "isDkim",
DROP COLUMN "primaryEmail";
