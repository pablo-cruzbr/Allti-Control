-- AlterTable
ALTER TABLE "equipamento" ADD COLUMN     "tipodeEquipamento_id" TEXT;

-- CreateTable
CREATE TABLE "TipodeEquipamento" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TipodeEquipamento_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "equipamento" ADD CONSTRAINT "equipamento_tipodeEquipamento_id_fkey" FOREIGN KEY ("tipodeEquipamento_id") REFERENCES "TipodeEquipamento"("id") ON DELETE SET NULL ON UPDATE CASCADE;
