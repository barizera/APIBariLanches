/*
  Warnings:

  - You are about to drop the `_OrderToProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_OrderToProduct" DROP CONSTRAINT "_OrderToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrderToProduct" DROP CONSTRAINT "_OrderToProduct_B_fkey";

-- DropTable
DROP TABLE "_OrderToProduct";

-- CreateTable
CREATE TABLE "oerder_to_product" (
    "id" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "produt_id" TEXT,
    "order_id" TEXT,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "oerder_to_product_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "oerder_to_product" ADD CONSTRAINT "oerder_to_product_produt_id_fkey" FOREIGN KEY ("produt_id") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "oerder_to_product" ADD CONSTRAINT "oerder_to_product_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
