-- AlterTable
ALTER TABLE "emailAccounts" ADD COLUMN     "dkimPath" TEXT,
ADD COLUMN     "domain" TEXT,
ADD COLUMN     "sender_password" TEXT;
