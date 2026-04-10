/*
  Warnings:

  - You are about to drop the column `equipamento_id` on the `Ordem de Serviço v3` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "CategoriaAtividade" AS ENUM ('EXTERNO', 'LABORATORIO');

-- CreateEnum
CREATE TYPE "StatusOS" AS ENUM ('TODAS', 'NAO_FINALIZADO', 'FINALIZADO', 'FINALIZADO_MANUAL', 'FINALIZADO_PENDENCIA', 'PAUSADO');

-- DropForeignKey
ALTER TABLE "Ordem de Serviço v3" DROP CONSTRAINT "Ordem de Serviço v3_equipamento_id_fkey";

-- AlterTable
ALTER TABLE "Ordem de Serviço v3" DROP COLUMN "equipamento_id",
ADD COLUMN     "atividadeRelacionada" TEXT,
ADD COLUMN     "equipamentoid" TEXT,
ADD COLUMN     "observacoes" TEXT,
ADD COLUMN     "status" "StatusOS" NOT NULL DEFAULT 'NAO_FINALIZADO';

-- CreateTable
CREATE TABLE "atividades_no_chamado" (
    "id" TEXT NOT NULL,
    "ordemServicoId" TEXT NOT NULL,
    "atividadePadraoId" TEXT NOT NULL,

    CONSTRAINT "atividades_no_chamado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "atividades_padrao" (
    "id" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "categoria" "CategoriaAtividade" NOT NULL,

    CONSTRAINT "atividades_padrao_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ordem de Serviço v3" ADD CONSTRAINT "Ordem de Serviço v3_equipamentoid_fkey" FOREIGN KEY ("equipamentoid") REFERENCES "equipamento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "atividades_no_chamado" ADD CONSTRAINT "atividades_no_chamado_ordemServicoId_fkey" FOREIGN KEY ("ordemServicoId") REFERENCES "Ordem de Serviço v3"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "atividades_no_chamado" ADD CONSTRAINT "atividades_no_chamado_atividadePadraoId_fkey" FOREIGN KEY ("atividadePadraoId") REFERENCES "atividades_padrao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
