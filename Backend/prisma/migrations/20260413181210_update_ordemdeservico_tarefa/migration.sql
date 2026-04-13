-- CreateTable
CREATE TABLE "tarefa" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ordemServicoId" TEXT NOT NULL,

    CONSTRAINT "tarefa_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tarefa" ADD CONSTRAINT "tarefa_ordemServicoId_fkey" FOREIGN KEY ("ordemServicoId") REFERENCES "ordem_servico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
