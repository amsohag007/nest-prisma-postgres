/*
  Warnings:

  - The primary key for the `UserAPIKeys` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `UserAPIKeys` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `UserOrders` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `UserOrders` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "UserAPIKeys" DROP CONSTRAINT "UserAPIKeys_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "UserAPIKeys_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "UserOrders" DROP CONSTRAINT "UserOrders_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "UserOrders_pkey" PRIMARY KEY ("id");
