/*
  Warnings:

  - You are about to drop the `FormTecnico` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Ordem de Serviço v2` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tipoDeSolicitacao` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FormTecnico" DROP CONSTRAINT "FormTecnico_ordemDeServico_id_fkey";

-- DropForeignKey
ALTER TABLE "FormTecnico" DROP CONSTRAINT "FormTecnico_statusOrdemdeServico_id_fkey";

-- DropForeignKey
ALTER TABLE "Ordem de Serviço v2" DROP CONSTRAINT "Ordem de Serviço v2_cliente_id_fkey";

-- DropForeignKey
ALTER TABLE "Ordem de Serviço v2" DROP CONSTRAINT "Ordem de Serviço v2_instituicaoUnidade_id_fkey";

-- DropForeignKey
ALTER TABLE "Ordem de Serviço v2" DROP CONSTRAINT "Ordem de Serviço v2_statusOrdemdeServico_id_fkey";

-- DropForeignKey
ALTER TABLE "Ordem de Serviço v2" DROP CONSTRAINT "Ordem de Serviço v2_tecnico_id_fkey";

-- DropForeignKey
ALTER TABLE "Ordem de Serviço v2" DROP CONSTRAINT "Ordem de Serviço v2_tipodesolicitacao_id_fkey";

-- DropForeignKey
ALTER TABLE "Ordem de Serviço v2" DROP CONSTRAINT "Ordem de Serviço v2_urgencia_id_fkey";

-- DropTable
DROP TABLE "FormTecnico";

-- DropTable
DROP TABLE "Ordem de Serviço v2";

-- DropTable
DROP TABLE "tipoDeSolicitacao";

-- CreateTable
CREATE TABLE "tipodeChamado" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tipodeChamado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ordem de Serviço v3" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "descricaodoProblemaouSolicitacao" TEXT NOT NULL,
    "nomedoContatoaserProcuradonoLocal" TEXT NOT NULL,
    "nameTecnico" TEXT,
    "diagnostico" TEXT,
    "solucao" TEXT,
    "bannerassinatura" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "tecnico_id" TEXT,
    "statusOrdemdeServico_id" TEXT,
    "tipodeChamado_id" TEXT NOT NULL,
    "cliente_id" TEXT,
    "instituicaoUnidade_id" TEXT,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Ordem de Serviço v3_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FotoOrdemServico" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "ordemdeServico_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FotoOrdemServico_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ordem de Serviço v3" ADD CONSTRAINT "Ordem de Serviço v3_tecnico_id_fkey" FOREIGN KEY ("tecnico_id") REFERENCES "tecnico"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ordem de Serviço v3" ADD CONSTRAINT "Ordem de Serviço v3_statusOrdemdeServico_id_fkey" FOREIGN KEY ("statusOrdemdeServico_id") REFERENCES "statusOrdemdeServico"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ordem de Serviço v3" ADD CONSTRAINT "Ordem de Serviço v3_tipodeChamado_id_fkey" FOREIGN KEY ("tipodeChamado_id") REFERENCES "tipodeChamado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ordem de Serviço v3" ADD CONSTRAINT "Ordem de Serviço v3_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "clientes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ordem de Serviço v3" ADD CONSTRAINT "Ordem de Serviço v3_instituicaoUnidade_id_fkey" FOREIGN KEY ("instituicaoUnidade_id") REFERENCES "instituicaoUnidade"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ordem de Serviço v3" ADD CONSTRAINT "Ordem de Serviço v3_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FotoOrdemServico" ADD CONSTRAINT "FotoOrdemServico_ordemdeServico_id_fkey" FOREIGN KEY ("ordemdeServico_id") REFERENCES "Ordem de Serviço v3"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
