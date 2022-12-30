/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "FieldStatusEnum" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "OrderStatusEnum" AS ENUM ('PENDING', 'RECEIVED', 'PRINTED', 'DELIVERED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "OrderTypeEnum" AS ENUM ('DELIVERY', 'PICKEDUP');

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "firstName" VARCHAR(255),
    "lastName" VARCHAR(255),
    "userName" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255),
    "phone" VARCHAR(255),
    "password" VARCHAR(255) NOT NULL,
    "address" JSONB DEFAULT '{}',
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "isSuperUser" BOOLEAN NOT NULL DEFAULT false,
    "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
    "isPhoneVerified" BOOLEAN NOT NULL DEFAULT false,
    "metaData" JSONB DEFAULT '{}',
    "status" "FieldStatusEnum" NOT NULL DEFAULT 'ACTIVE',
    "createdById" UUID,
    "updatedById" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAPIKeys" (
    "id" SERIAL NOT NULL,
    "apiKey" VARCHAR(255) NOT NULL,
    "usageCount" INTEGER NOT NULL DEFAULT 0,
    "isRevoked" BOOLEAN NOT NULL DEFAULT false,
    "expiresAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metaData" JSONB DEFAULT '{}',
    "status" "FieldStatusEnum" NOT NULL DEFAULT 'ACTIVE',
    "createdById" UUID,
    "updatedById" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "userId" UUID NOT NULL,

    CONSTRAINT "UserAPIKeys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserOrders" (
    "id" SERIAL NOT NULL,
    "customerInfo" JSONB DEFAULT '{}',
    "deliveryInfo" JSONB DEFAULT '{}',
    "items" JSONB,
    "subTotalPrice" REAL,
    "deliveryFee" REAL,
    "vat" REAL,
    "discount" REAL,
    "totalPrice" REAL,
    "orderTyoe" "OrderTypeEnum" NOT NULL DEFAULT 'DELIVERY',
    "orderStatus" "OrderStatusEnum" NOT NULL DEFAULT 'PENDING',
    "metaData" JSONB DEFAULT '{}',
    "status" "FieldStatusEnum" NOT NULL DEFAULT 'ACTIVE',
    "createdById" UUID,
    "updatedById" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "userId" UUID NOT NULL,

    CONSTRAINT "UserOrders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_userName_key" ON "Users"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_phone_key" ON "Users"("phone");

-- CreateIndex
CREATE INDEX "Users_userName_email_idx" ON "Users"("userName", "email");

-- AddForeignKey
ALTER TABLE "UserAPIKeys" ADD CONSTRAINT "UserAPIKeys_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOrders" ADD CONSTRAINT "UserOrders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
