-- AlterTable
ALTER TABLE "UserOrders" ALTER COLUMN "subTotalPrice" SET DEFAULT 0,
ALTER COLUMN "deliveryFee" SET DEFAULT 0,
ALTER COLUMN "vat" SET DEFAULT 0,
ALTER COLUMN "discount" SET DEFAULT 0,
ALTER COLUMN "totalPrice" SET DEFAULT 0;