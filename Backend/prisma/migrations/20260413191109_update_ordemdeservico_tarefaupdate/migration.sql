/*
  Warnings:

  - You are about to drop the column `ordemServicoId` on the `tarefa` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "tarefa" DROP CONSTRAINT "tarefa_ordemServicoId_fkey";

-- AlterTable
ALTER TABLE "ordem_servico" ADD COLUMN     "tarefa_id" TEXT;

-- AlterTable
ALTER TABLE "tarefa" DROP COLUMN "ordemServicoId";

-- AddForeignKey
ALTER TABLE "ordem_servico" ADD CONSTRAINT "ordem_servico_tarefa_id_fkey" FOREIGN KEY ("tarefa_id") REFERENCES "tarefa"("id") ON DELETE SET NULL ON UPDATE CASCADE;
