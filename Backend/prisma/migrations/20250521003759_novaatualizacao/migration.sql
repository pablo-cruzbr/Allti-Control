/*
  Warnings:

  - You are about to drop the column `instituicao_id` on the `documentacaoTecnica` table. All the data in the column will be lost.
  - You are about to drop the column `instituicao_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `OrdemdeServico` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `controleDeLaboratio` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FormTecnico" DROP CONSTRAINT "FormTecnico_ordemDeServico_id_fkey";

-- DropForeignKey
ALTER TABLE "OrdemdeServico" DROP CONSTRAINT "OrdemdeServico_cliente_id_fkey";

-- DropForeignKey
ALTER TABLE "OrdemdeServico" DROP CONSTRAINT "OrdemdeServico_instituicaoUnidade_id_fkey";

-- DropForeignKey
ALTER TABLE "OrdemdeServico" DROP CONSTRAINT "OrdemdeServico_statusOrdemdeServico_id_fkey";

-- DropForeignKey
ALTER TABLE "OrdemdeServico" DROP CONSTRAINT "OrdemdeServico_tecnico_id_fkey";

-- DropForeignKey
ALTER TABLE "OrdemdeServico" DROP CONSTRAINT "OrdemdeServico_tipodesolicitacao_id_fkey";

-- DropForeignKey
ALTER TABLE "controleDeAssistenciaTecnica" DROP CONSTRAINT "controleDeAssistenciaTecnica_instituicaoUnidade_id_fkey";

-- DropForeignKey
ALTER TABLE "controleDeLaboratio" DROP CONSTRAINT "controleDeLaboratio_cliente_id_fkey";

-- DropForeignKey
ALTER TABLE "controleDeLaboratio" DROP CONSTRAINT "controleDeLaboratio_equipamento_id_fkey";

-- DropForeignKey
ALTER TABLE "controleDeLaboratio" DROP CONSTRAINT "controleDeLaboratio_instituicao_id_fkey";

-- DropForeignKey
ALTER TABLE "controleDeLaboratio" DROP CONSTRAINT "controleDeLaboratio_statusControledeLaboratorio_id_fkey";

-- DropForeignKey
ALTER TABLE "documentacaoTecnica" DROP CONSTRAINT "documentacaoTecnica_instituicao_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_instituicao_id_fkey";

-- AlterTable
ALTER TABLE "controleDeAssistenciaTecnica" ALTER COLUMN "instituicaoUnidade_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "documentacaoTecnica" DROP COLUMN "instituicao_id",
ADD COLUMN     "instituicaoUnidade_id" TEXT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "instituicao_id",
ADD COLUMN     "instituicaoUnidade_id" TEXT;

-- DropTable
DROP TABLE "OrdemdeServico";

-- DropTable
DROP TABLE "controleDeLaboratio";

-- CreateTable
CREATE TABLE "Ordem de Serviço" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "problemaOuSolicitacao" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "cliente_id" TEXT,
    "tecnico_id" TEXT,
    "statusOrdemdeServico_id" TEXT,
    "tipodesolicitacao_id" TEXT NOT NULL,
    "instituicaoUnidade_id" TEXT,
    "urgencia_id" TEXT,

    CONSTRAINT "Ordem de Serviço_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "urgencia" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "urgencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ControledeLaboratorio" (
    "id" TEXT NOT NULL,
    "nomedoEquipamento" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "defeito" TEXT NOT NULL,
    "osDeAbertura" TEXT NOT NULL,
    "osDeDevolucao" TEXT NOT NULL,
    "data_de_Chegada" TIMESTAMP(3) NOT NULL,
    "data_de_Finalizacao" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "statusControledeLaboratorio_id" TEXT NOT NULL,
    "instituicaoUnidade_id" TEXT,
    "cliente_id" TEXT,
    "equipamento_id" TEXT,

    CONSTRAINT "ControledeLaboratorio_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_instituicaoUnidade_id_fkey" FOREIGN KEY ("instituicaoUnidade_id") REFERENCES "instituicaoUnidade"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ordem de Serviço" ADD CONSTRAINT "Ordem de Serviço_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "clientes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ordem de Serviço" ADD CONSTRAINT "Ordem de Serviço_tecnico_id_fkey" FOREIGN KEY ("tecnico_id") REFERENCES "tecnico"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ordem de Serviço" ADD CONSTRAINT "Ordem de Serviço_statusOrdemdeServico_id_fkey" FOREIGN KEY ("statusOrdemdeServico_id") REFERENCES "status"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ordem de Serviço" ADD CONSTRAINT "Ordem de Serviço_tipodesolicitacao_id_fkey" FOREIGN KEY ("tipodesolicitacao_id") REFERENCES "tipoDeSolicitacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ordem de Serviço" ADD CONSTRAINT "Ordem de Serviço_instituicaoUnidade_id_fkey" FOREIGN KEY ("instituicaoUnidade_id") REFERENCES "instituicaoUnidade"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ordem de Serviço" ADD CONSTRAINT "Ordem de Serviço_urgencia_id_fkey" FOREIGN KEY ("urgencia_id") REFERENCES "urgencia"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormTecnico" ADD CONSTRAINT "FormTecnico_ordemDeServico_id_fkey" FOREIGN KEY ("ordemDeServico_id") REFERENCES "Ordem de Serviço"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "controleDeAssistenciaTecnica" ADD CONSTRAINT "controleDeAssistenciaTecnica_instituicaoUnidade_id_fkey" FOREIGN KEY ("instituicaoUnidade_id") REFERENCES "instituicaoUnidade"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ControledeLaboratorio" ADD CONSTRAINT "ControledeLaboratorio_statusControledeLaboratorio_id_fkey" FOREIGN KEY ("statusControledeLaboratorio_id") REFERENCES "statusControledeLaboratorio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ControledeLaboratorio" ADD CONSTRAINT "ControledeLaboratorio_instituicaoUnidade_id_fkey" FOREIGN KEY ("instituicaoUnidade_id") REFERENCES "instituicaoUnidade"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ControledeLaboratorio" ADD CONSTRAINT "ControledeLaboratorio_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "clientes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ControledeLaboratorio" ADD CONSTRAINT "ControledeLaboratorio_equipamento_id_fkey" FOREIGN KEY ("equipamento_id") REFERENCES "equipamento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentacaoTecnica" ADD CONSTRAINT "documentacaoTecnica_instituicaoUnidade_id_fkey" FOREIGN KEY ("instituicaoUnidade_id") REFERENCES "instituicaoUnidade"("id") ON DELETE SET NULL ON UPDATE CASCADE;
