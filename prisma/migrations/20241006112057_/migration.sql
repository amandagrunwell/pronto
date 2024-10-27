/*
  Warnings:

  - Added the required column `domainServiceEmail` to the `emailAccounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `primaryEmail` to the `emailAccounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "emailAccounts" ADD COLUMN     "domainServiceEmail" TEXT NOT NULL,
ADD COLUMN     "primaryEmail" TEXT NOT NULL;
