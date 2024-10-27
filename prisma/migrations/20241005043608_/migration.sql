/*
  Warnings:

  - Added the required column `expires` to the `emailAccounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "emailAccounts" ADD COLUMN     "expires" TIMESTAMP(3) NOT NULL;
