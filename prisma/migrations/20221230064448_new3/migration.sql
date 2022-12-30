/*
  Warnings:

  - You are about to drop the column `orderTyoe` on the `UserOrders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserOrders" DROP COLUMN "orderTyoe",
ADD COLUMN     "orderType" "OrderTypeEnum" NOT NULL DEFAULT 'DELIVERY';
