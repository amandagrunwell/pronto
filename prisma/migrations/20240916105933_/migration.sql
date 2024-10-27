-- CreateTable
CREATE TABLE "bec" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "ceo_name" TEXT NOT NULL,
    "ceo_email" TEXT,
    "cfo_email" TEXT NOT NULL,
    "location" TEXT NOT NULL DEFAULT '',
    "isSent" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "bec_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "bec_cfo_email_key" ON "bec"("cfo_email");
