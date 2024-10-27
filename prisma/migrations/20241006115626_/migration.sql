/*
  Warnings:

  - Added the required column `isDkim` to the `emailAccounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "emailAccounts" ADD COLUMN     "isDkim" BOOLEAN NOT NULL;
