-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('female', 'male');

-- AlterTable
ALTER TABLE "clAccounts" ADD COLUMN     "gender" "Gender" NOT NULL DEFAULT 'female';
