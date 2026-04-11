/*
  Warnings:

  - You are about to drop the `Ordem de Serviço v3` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FormTecnico" DROP CONSTRAINT "FormTecnico_ordemDeServico_id_fkey";

-- DropForeignKey
ALTER TABLE "FotoOrdemServico" DROP CONSTRAINT "FotoOrdemServico_ordemdeServico_id_fkey";

-- DropForeignKey
ALTER TABLE "Ordem de Serviço v3" DROP CONSTRAINT "Ordem de Serviço v3_cliente_id_fkey";

-- DropForeignKey
ALTER TABLE "Ordem de Serviço v3" DROP CONSTRAINT "Ordem de Serviço v3_equipamentoid_fkey";

-- DropForeignKey
ALTER TABLE "Ordem de Serviço v3" DROP CONSTRAINT "Ordem de Serviço v3_informacoesSetorId_fkey";

-- DropForeignKey
ALTER TABLE "Ordem de Serviço v3" DROP CONSTRAINT "Ordem de Serviço v3_instituicaoUnidade_id_fkey";

-- DropForeignKey
ALTER TABLE "Ordem de Serviço v3" DROP CONSTRAINT "Ordem de Serviço v3_prioridade_id_fkey";

-- DropForeignKey
ALTER TABLE "Ordem de Serviço v3" DROP CONSTRAINT "Ordem de Serviço v3_statusOrdemdeServico_id_fkey";

-- DropForeignKey
ALTER TABLE "Ordem de Serviço v3" DROP CONSTRAINT "Ordem de Serviço v3_tecnico_id_fkey";

-- DropForeignKey
ALTER TABLE "Ordem de Serviço v3" DROP CONSTRAINT "Ordem de Serviço v3_tipodeChamado_id_fkey";

-- DropForeignKey
ALTER TABLE "Ordem de Serviço v3" DROP CONSTRAINT "Ordem de Serviço v3_tipodeOrdemdeServico_id_fkey";

-- DropForeignKey
ALTER TABLE "Ordem de Serviço v3" DROP CONSTRAINT "Ordem de Serviço v3_user_id_fkey";

-- DropForeignKey
ALTER TABLE "atividades_no_chamado" DROP CONSTRAINT "atividades_no_chamado_ordemServicoId_fkey";

-- DropTable
DROP TABLE "Ordem de Serviço v3";

-- CreateTable
CREATE TABLE "ordem_servico" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "descricaodoProblemaouSolicitacao" TEXT,
    "nomedoContatoaserProcuradonoLocal" TEXT,
    "nameTecnico" TEXT,
    "diagnostico" TEXT,
    "solucao" TEXT,
    "bannerassinatura" TEXT,
    "assinante" TEXT,
    "assinaturaDigital" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "tecnico_id" TEXT,
    "statusOrdemdeServico_id" TEXT,
    "tipodeChamado_id" TEXT NOT NULL,
    "cliente_id" TEXT,
    "instituicaoUnidade_id" TEXT,
    "user_id" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3),
    "endedAt" TIMESTAMP(3),
    "pausaIniciadaEm" TIMESTAMP(3),
    "duracao" INTEGER,
    "numeroOS" INTEGER,
    "status" "StatusOS" NOT NULL DEFAULT 'NAO_FINALIZADO',
    "atividadeRelacionada" TEXT,
    "observacoes" TEXT,
    "informacoesSetorId" TEXT,
    "equipamentoid" TEXT,
    "tipodeOrdemdeServico_id" TEXT,
    "prioridade_id" TEXT,

    CONSTRAINT "ordem_servico_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ordem_servico_numeroOS_key" ON "ordem_servico"("numeroOS");

-- AddForeignKey
ALTER TABLE "ordem_servico" ADD CONSTRAINT "ordem_servico_informacoesSetorId_fkey" FOREIGN KEY ("informacoesSetorId") REFERENCES "informacoes_setor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordem_servico" ADD CONSTRAINT "ordem_servico_equipamentoid_fkey" FOREIGN KEY ("equipamentoid") REFERENCES "equipamento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordem_servico" ADD CONSTRAINT "ordem_servico_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "clientes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordem_servico" ADD CONSTRAINT "ordem_servico_instituicaoUnidade_id_fkey" FOREIGN KEY ("instituicaoUnidade_id") REFERENCES "instituicaoUnidade"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordem_servico" ADD CONSTRAINT "ordem_servico_statusOrdemdeServico_id_fkey" FOREIGN KEY ("statusOrdemdeServico_id") REFERENCES "statusOrdemdeServico"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordem_servico" ADD CONSTRAINT "ordem_servico_tecnico_id_fkey" FOREIGN KEY ("tecnico_id") REFERENCES "tecnico"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordem_servico" ADD CONSTRAINT "ordem_servico_tipodeChamado_id_fkey" FOREIGN KEY ("tipodeChamado_id") REFERENCES "tipodeChamado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordem_servico" ADD CONSTRAINT "ordem_servico_tipodeOrdemdeServico_id_fkey" FOREIGN KEY ("tipodeOrdemdeServico_id") REFERENCES "tipodeOrdemdeServico"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordem_servico" ADD CONSTRAINT "ordem_servico_prioridade_id_fkey" FOREIGN KEY ("prioridade_id") REFERENCES "prioridade"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordem_servico" ADD CONSTRAINT "ordem_servico_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "atividades_no_chamado" ADD CONSTRAINT "atividades_no_chamado_ordemServicoId_fkey" FOREIGN KEY ("ordemServicoId") REFERENCES "ordem_servico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormTecnico" ADD CONSTRAINT "FormTecnico_ordemDeServico_id_fkey" FOREIGN KEY ("ordemDeServico_id") REFERENCES "ordem_servico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FotoOrdemServico" ADD CONSTRAINT "FotoOrdemServico_ordemdeServico_id_fkey" FOREIGN KEY ("ordemdeServico_id") REFERENCES "ordem_servico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
