-- CreateTable
CREATE TABLE "FormTecnico" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "diagnostico" TEXT NOT NULL,
    "solucao" TEXT NOT NULL,
    "assinatura" TEXT NOT NULL,
    "status_id" TEXT NOT NULL,
    "statusOrdemdeServico_id" TEXT NOT NULL,
    "ordemDeServico_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FormTecnico_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FormTecnico_ordemDeServico_id_key" ON "FormTecnico"("ordemDeServico_id");

-- AddForeignKey
ALTER TABLE "FormTecnico" ADD CONSTRAINT "FormTecnico_statusOrdemdeServico_id_fkey" FOREIGN KEY ("statusOrdemdeServico_id") REFERENCES "statusOrdemdeServico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormTecnico" ADD CONSTRAINT "FormTecnico_ordemDeServico_id_fkey" FOREIGN KEY ("ordemDeServico_id") REFERENCES "Ordem de Serviço v3"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
