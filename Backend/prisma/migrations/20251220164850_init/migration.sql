-- AlterTable
ALTER TABLE "Ordem de Serviço v3" ADD COLUMN     "tipodeOrdemdeServico_id" TEXT;

-- CreateTable
CREATE TABLE "tipodeOrdemdeServico" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tipodeOrdemdeServico_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ordem de Serviço v3" ADD CONSTRAINT "Ordem de Serviço v3_tipodeOrdemdeServico_id_fkey" FOREIGN KEY ("tipodeOrdemdeServico_id") REFERENCES "tipodeOrdemdeServico"("id") ON DELETE SET NULL ON UPDATE CASCADE;
