/*
  Warnings:

  - You are about to drop the `urgencia` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Ordem de Serviço v3" ADD COLUMN     "prioridade_id" TEXT;

-- DropTable
DROP TABLE "urgencia";

-- CreateTable
CREATE TABLE "prioridade" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "prioridade_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ordem de Serviço v3" ADD CONSTRAINT "Ordem de Serviço v3_prioridade_id_fkey" FOREIGN KEY ("prioridade_id") REFERENCES "prioridade"("id") ON DELETE SET NULL ON UPDATE CASCADE;
