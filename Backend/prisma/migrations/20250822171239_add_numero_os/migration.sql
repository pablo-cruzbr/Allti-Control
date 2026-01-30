/*
  Warnings:

  - A unique constraint covering the columns `[numeroOS]` on the table `Ordem de Serviço v3` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Ordem de Serviço v3" ADD COLUMN     "numeroOS" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Ordem de Serviço v3_numeroOS_key" ON "Ordem de Serviço v3"("numeroOS");
