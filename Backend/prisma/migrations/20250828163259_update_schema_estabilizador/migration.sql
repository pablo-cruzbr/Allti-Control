-- CreateTable
CREATE TABLE "estabilizadores" (
    "id" TEXT NOT NULL,
    "patrimonio" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "estabilizadores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "statusestabilizadores" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "statusestabilizadores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "controledeEstabilizadores" (
    "id" TEXT NOT NULL,
    "idChamado" TEXT NOT NULL,
    "observacoes" TEXT NOT NULL,
    "osdaAssistencia" TEXT NOT NULL,
    "datadeRetirada" TEXT NOT NULL,
    "datadeEntrega" TEXT NOT NULL,
    "statusCompras_id" TEXT NOT NULL,
    "estabilizadores_id" TEXT NOT NULL,
    "instituicaoUnidade_id" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "controledeEstabilizadores_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "controledeEstabilizadores" ADD CONSTRAINT "controledeEstabilizadores_statusCompras_id_fkey" FOREIGN KEY ("statusCompras_id") REFERENCES "statusestabilizadores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "controledeEstabilizadores" ADD CONSTRAINT "controledeEstabilizadores_estabilizadores_id_fkey" FOREIGN KEY ("estabilizadores_id") REFERENCES "estabilizadores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "controledeEstabilizadores" ADD CONSTRAINT "controledeEstabilizadores_instituicaoUnidade_id_fkey" FOREIGN KEY ("instituicaoUnidade_id") REFERENCES "instituicaoUnidade"("id") ON DELETE SET NULL ON UPDATE CASCADE;
