/*
  Warnings:

  - You are about to drop the column `update_at` on the `Ordem de Serviço v3` table. All the data in the column will be lost.
  - The `duracao` column on the `Ordem de Serviço v3` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Ordem de Serviço v3" DROP COLUMN "update_at",
ADD COLUMN     "updatedAt" TIMESTAMP(3),
DROP COLUMN "duracao",
ADD COLUMN     "duracao" INTEGER;
