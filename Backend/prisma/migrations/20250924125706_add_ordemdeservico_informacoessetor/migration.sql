-- AlterTable
ALTER TABLE "Ordem de Serviço v3" ADD COLUMN     "informacoesSetorId" TEXT;

-- AddForeignKey
ALTER TABLE "Ordem de Serviço v3" ADD CONSTRAINT "Ordem de Serviço v3_informacoesSetorId_fkey" FOREIGN KEY ("informacoesSetorId") REFERENCES "informacoes_setor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
