/*
  Warnings:

  - You are about to drop the column `create_at` on the `clientes` table. All the data in the column will be lost.
  - You are about to drop the column `create_at` on the `controleDeAssistenciaTecnica` table. All the data in the column will be lost.
  - You are about to drop the column `create_at` on the `controleDeLaudoTecnico` table. All the data in the column will be lost.
  - You are about to drop the column `create_at` on the `controleDeMaquinasPendentesLaboratorio` table. All the data in the column will be lost.
  - You are about to drop the column `create_at` on the `controledeMaquinasPendentesOro` table. All the data in the column will be lost.
  - You are about to drop the column `create_at` on the `documentacaoTecnica` table. All the data in the column will be lost.
  - You are about to drop the column `create_at` on the `equipamento` table. All the data in the column will be lost.
  - You are about to drop the column `create_at` on the `instituicaoUnidade` table. All the data in the column will be lost.
  - You are about to drop the column `create_at` on the `setores` table. All the data in the column will be lost.
  - You are about to drop the column `create_at` on the `solicitacaoDeCompras` table. All the data in the column will be lost.
  - You are about to drop the column `create_at` on the `solicitacoesDeCompras` table. All the data in the column will be lost.
  - You are about to drop the column `create_at` on the `statusControledeLaboratorio` table. All the data in the column will be lost.
  - You are about to drop the column `create_at` on the `statusControledeMaquinasPendentesLab` table. All the data in the column will be lost.
  - You are about to drop the column `create_at` on the `statusControledeMaquinasPendentesOro` table. All the data in the column will be lost.
  - You are about to drop the column `create_at` on the `statusReparo` table. All the data in the column will be lost.
  - You are about to drop the column `create_at` on the `tecnico` table. All the data in the column will be lost.
  - You are about to drop the column `create_at` on the `tipoDeSolicitacao` table. All the data in the column will be lost.
  - You are about to drop the column `create_at` on the `urgencia` table. All the data in the column will be lost.
  - You are about to drop the column `create_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `status` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FormTecnico" DROP CONSTRAINT "FormTecnico_statusOrdemdeServico_id_fkey";

-- DropForeignKey
ALTER TABLE "Ordem de Serviço" DROP CONSTRAINT "Ordem de Serviço_statusOrdemdeServico_id_fkey";

-- AlterTable
ALTER TABLE "clientes" DROP COLUMN "create_at",
ADD COLUMN     "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "controleDeAssistenciaTecnica" DROP COLUMN "create_at",
ADD COLUMN     "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "controleDeLaudoTecnico" DROP COLUMN "create_at",
ADD COLUMN     "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "controleDeMaquinasPendentesLaboratorio" DROP COLUMN "create_at",
ADD COLUMN     "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "controledeMaquinasPendentesOro" DROP COLUMN "create_at",
ADD COLUMN     "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "documentacaoTecnica" DROP COLUMN "create_at",
ADD COLUMN     "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "equipamento" DROP COLUMN "create_at",
ADD COLUMN     "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "instituicaoUnidade" DROP COLUMN "create_at",
ADD COLUMN     "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "setores" DROP COLUMN "create_at",
ADD COLUMN     "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "solicitacaoDeCompras" DROP COLUMN "create_at",
ADD COLUMN     "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "solicitacoesDeCompras" DROP COLUMN "create_at",
ADD COLUMN     "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "statusControledeLaboratorio" DROP COLUMN "create_at",
ADD COLUMN     "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "statusControledeMaquinasPendentesLab" DROP COLUMN "create_at",
ADD COLUMN     "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "statusControledeMaquinasPendentesOro" DROP COLUMN "create_at",
ADD COLUMN     "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "statusReparo" DROP COLUMN "create_at",
ADD COLUMN     "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "tecnico" DROP COLUMN "create_at",
ADD COLUMN     "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "tipoDeSolicitacao" DROP COLUMN "create_at",
ADD COLUMN     "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "urgencia" DROP COLUMN "create_at",
ADD COLUMN     "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "create_at",
ADD COLUMN     "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "status";

-- CreateTable
CREATE TABLE "statusOrdemdeServico" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "statusOrdemdeServico_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ordem de Serviço" ADD CONSTRAINT "Ordem de Serviço_statusOrdemdeServico_id_fkey" FOREIGN KEY ("statusOrdemdeServico_id") REFERENCES "statusOrdemdeServico"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormTecnico" ADD CONSTRAINT "FormTecnico_statusOrdemdeServico_id_fkey" FOREIGN KEY ("statusOrdemdeServico_id") REFERENCES "statusOrdemdeServico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
