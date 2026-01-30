-- AlterTable
ALTER TABLE "informacoes_setor" ADD COLUMN     "cliente_id" TEXT,
ADD COLUMN     "instituicaoUnidade_id" TEXT;

-- AddForeignKey
ALTER TABLE "informacoes_setor" ADD CONSTRAINT "informacoes_setor_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "clientes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "informacoes_setor" ADD CONSTRAINT "informacoes_setor_instituicaoUnidade_id_fkey" FOREIGN KEY ("instituicaoUnidade_id") REFERENCES "instituicaoUnidade"("id") ON DELETE SET NULL ON UPDATE CASCADE;
