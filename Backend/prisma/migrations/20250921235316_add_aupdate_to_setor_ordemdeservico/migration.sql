-- AlterTable
ALTER TABLE "Ordem de Serviço v3" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "descricaodoProblemaouSolicitacao" DROP NOT NULL,
ALTER COLUMN "nomedoContatoaserProcuradonoLocal" DROP NOT NULL;

-- AlterTable
ALTER TABLE "clientes" ADD COLUMN     "cnpj" TEXT;

-- AlterTable
ALTER TABLE "setores" ADD COLUMN     "andar" TEXT,
ADD COLUMN     "ramal" TEXT,
ADD COLUMN     "usuario" TEXT,
ALTER COLUMN "name" DROP NOT NULL;
