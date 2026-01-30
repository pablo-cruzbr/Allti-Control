/*
  Warnings:

  - You are about to drop the column `andar` on the `setores` table. All the data in the column will be lost.
  - You are about to drop the column `ramal` on the `setores` table. All the data in the column will be lost.
  - You are about to drop the column `usuario` on the `setores` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ordem de Serviço v3" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "setores" DROP COLUMN "andar",
DROP COLUMN "ramal",
DROP COLUMN "usuario";

-- CreateTable
CREATE TABLE "informacoes_setor" (
    "id" TEXT NOT NULL,
    "usuario" TEXT,
    "andar" TEXT,
    "ramal" TEXT,
    "setorId" TEXT NOT NULL,

    CONSTRAINT "informacoes_setor_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "informacoes_setor" ADD CONSTRAINT "informacoes_setor_setorId_fkey" FOREIGN KEY ("setorId") REFERENCES "setores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
