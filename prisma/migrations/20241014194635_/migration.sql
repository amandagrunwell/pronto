/*
  Warnings:

  - Added the required column `email` to the `clAccounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clAccounts" ADD COLUMN     "email" TEXT NOT NULL;
