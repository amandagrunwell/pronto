-- CreateTable
CREATE TABLE "clAccounts" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "routineNumber" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "accountType" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,

    CONSTRAINT "clAccounts_pkey" PRIMARY KEY ("id")
);
