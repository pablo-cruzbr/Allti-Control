-- AlterTable
ALTER TABLE "controleDeMaquinasPendentesLaboratorio" ADD COLUMN     "instituicaoUnidade_id" TEXT;

-- AddForeignKey
ALTER TABLE "controleDeMaquinasPendentesLaboratorio" ADD CONSTRAINT "controleDeMaquinasPendentesLaboratorio_instituicaoUnidade__fkey" FOREIGN KEY ("instituicaoUnidade_id") REFERENCES "instituicaoUnidade"("id") ON DELETE SET NULL ON UPDATE CASCADE;
