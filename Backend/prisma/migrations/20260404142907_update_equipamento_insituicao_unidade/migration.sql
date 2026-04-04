-- AlterTable
ALTER TABLE "equipamento" ADD COLUMN     "instituicaoUnidade_id" TEXT;

-- AddForeignKey
ALTER TABLE "equipamento" ADD CONSTRAINT "equipamento_instituicaoUnidade_id_fkey" FOREIGN KEY ("instituicaoUnidade_id") REFERENCES "instituicaoUnidade"("id") ON DELETE SET NULL ON UPDATE CASCADE;
