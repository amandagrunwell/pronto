-- CreateEnum
CREATE TYPE "accountType" AS ENUM ('zoho', 'google', 'nameCheap', 'microsoft');

-- CreateTable
CREATE TABLE "emailAccounts" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "service" "accountType" NOT NULL,
    "ZohoClientId" TEXT,
    "zohoClientSecret" TEXT,
    "ZohoAuthCode" TEXT,
    "ZohoRefreshToken" TEXT,
    "zoho_account_id" TEXT,
    "zoho_sender_email" TEXT,
    "isGood" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "emailAccounts_pkey" PRIMARY KEY ("id")
);
