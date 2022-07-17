/*
  Warnings:

  - You are about to drop the `oerder_to_product` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "oerder_to_product" DROP CONSTRAINT "oerder_to_product_order_id_fkey";

-- DropForeignKey
ALTER TABLE "oerder_to_product" DROP CONSTRAINT "oerder_to_product_produt_id_fkey";

-- DropTable
DROP TABLE "oerder_to_product";

-- CreateTable
CREATE TABLE "order_to_product" (
    "id" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "produt_id" TEXT,
    "order_id" TEXT,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "order_to_product_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "order_to_product" ADD CONSTRAINT "order_to_product_produt_id_fkey" FOREIGN KEY ("produt_id") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_to_product" ADD CONSTRAINT "order_to_product_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
