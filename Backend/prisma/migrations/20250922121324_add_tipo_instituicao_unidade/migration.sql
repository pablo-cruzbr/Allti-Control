-- AlterTable
ALTER TABLE "instituicaoUnidade" ADD COLUMN     "tipodeinstituicaoUnidade_id" TEXT;

-- CreateTable
CREATE TABLE "tipodeInstituicaoUnidade" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tipodeInstituicaoUnidade_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "instituicaoUnidade" ADD CONSTRAINT "instituicaoUnidade_tipodeinstituicaoUnidade_id_fkey" FOREIGN KEY ("tipodeinstituicaoUnidade_id") REFERENCES "tipodeInstituicaoUnidade"("id") ON DELETE SET NULL ON UPDATE CASCADE;
