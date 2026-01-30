/*
  Warnings:

  - You are about to drop the `Ordem de Serviço` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `endereco` to the `instituicaoUnidade` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FormTecnico" DROP CONSTRAINT "FormTecnico_ordemDeServico_id_fkey";

-- DropForeignKey
ALTER TABLE "Ordem de Serviço" DROP CONSTRAINT "Ordem de Serviço_cliente_id_fkey";

-- DropForeignKey
ALTER TABLE "Ordem de Serviço" DROP CONSTRAINT "Ordem de Serviço_instituicaoUnidade_id_fkey";

-- DropForeignKey
ALTER TABLE "Ordem de Serviço" DROP CONSTRAINT "Ordem de Serviço_statusOrdemdeServico_id_fkey";

-- DropForeignKey
ALTER TABLE "Ordem de Serviço" DROP CONSTRAINT "Ordem de Serviço_tecnico_id_fkey";

-- DropForeignKey
ALTER TABLE "Ordem de Serviço" DROP CONSTRAINT "Ordem de Serviço_tipodesolicitacao_id_fkey";

-- DropForeignKey
ALTER TABLE "Ordem de Serviço" DROP CONSTRAINT "Ordem de Serviço_urgencia_id_fkey";

-- AlterTable
ALTER TABLE "clientes" ADD COLUMN     "endereco" TEXT;

-- AlterTable
ALTER TABLE "instituicaoUnidade" ADD COLUMN     "endereco" TEXT NOT NULL;

-- DropTable
DROP TABLE "Ordem de Serviço";

-- CreateTable
CREATE TABLE "Ordem de Serviço v2" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "problemaOuSolicitacao" TEXT NOT NULL,
    "nameTecnico" TEXT,
    "diagnostico" TEXT,
    "solucao" TEXT,
    "assinatura" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "draft" BOOLEAN NOT NULL DEFAULT true,
    "tecnico_id" TEXT,
    "statusOrdemdeServico_id" TEXT,
    "tipodesolicitacao_id" TEXT NOT NULL,
    "cliente_id" TEXT,
    "instituicaoUnidade_id" TEXT,
    "urgencia_id" TEXT NOT NULL,

    CONSTRAINT "Ordem de Serviço v2_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ordem de Serviço v2" ADD CONSTRAINT "Ordem de Serviço v2_tecnico_id_fkey" FOREIGN KEY ("tecnico_id") REFERENCES "tecnico"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ordem de Serviço v2" ADD CONSTRAINT "Ordem de Serviço v2_statusOrdemdeServico_id_fkey" FOREIGN KEY ("statusOrdemdeServico_id") REFERENCES "statusOrdemdeServico"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ordem de Serviço v2" ADD CONSTRAINT "Ordem de Serviço v2_tipodesolicitacao_id_fkey" FOREIGN KEY ("tipodesolicitacao_id") REFERENCES "tipoDeSolicitacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ordem de Serviço v2" ADD CONSTRAINT "Ordem de Serviço v2_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "clientes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ordem de Serviço v2" ADD CONSTRAINT "Ordem de Serviço v2_instituicaoUnidade_id_fkey" FOREIGN KEY ("instituicaoUnidade_id") REFERENCES "instituicaoUnidade"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ordem de Serviço v2" ADD CONSTRAINT "Ordem de Serviço v2_urgencia_id_fkey" FOREIGN KEY ("urgencia_id") REFERENCES "urgencia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormTecnico" ADD CONSTRAINT "FormTecnico_ordemDeServico_id_fkey" FOREIGN KEY ("ordemDeServico_id") REFERENCES "Ordem de Serviço v2"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
