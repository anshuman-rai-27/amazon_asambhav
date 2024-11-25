/*
  Warnings:

  - A unique constraint covering the columns `[productId]` on the table `OrderProduct` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "OrderProduct_productId_key" ON "OrderProduct"("productId");
