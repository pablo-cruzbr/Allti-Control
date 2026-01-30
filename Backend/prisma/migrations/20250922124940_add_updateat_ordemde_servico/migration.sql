/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Ordem de Serviço v3` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ordem de Serviço v3" DROP COLUMN "updatedAt",
ADD COLUMN     "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;
