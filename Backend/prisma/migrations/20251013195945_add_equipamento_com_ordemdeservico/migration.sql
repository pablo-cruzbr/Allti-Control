-- AlterTable
ALTER TABLE "Ordem de Serviço v3" ADD COLUMN     "equipamento_id" TEXT;

-- AddForeignKey
ALTER TABLE "Ordem de Serviço v3" ADD CONSTRAINT "Ordem de Serviço v3_equipamento_id_fkey" FOREIGN KEY ("equipamento_id") REFERENCES "equipamento"("id") ON DELETE SET NULL ON UPDATE CASCADE;
