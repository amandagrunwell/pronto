/*
  Warnings:

  - You are about to drop the column `zoho_sender_email` on the `emailAccounts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "emailAccounts" DROP COLUMN "zoho_sender_email",
ADD COLUMN     "sender_email" TEXT;
