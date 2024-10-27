/*
  Warnings:

  - Added the required column `accountLevel` to the `clAccounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clAccounts" ADD COLUMN     "accountLevel" TEXT NOT NULL;
