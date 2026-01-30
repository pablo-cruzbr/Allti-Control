/*
  Warnings:

  - You are about to drop the column `datadeEntrega` on the `controledeEstabilizadores` table. All the data in the column will be lost.
  - You are about to drop the column `statusCompras_id` on the `controledeEstabilizadores` table. All the data in the column will be lost.
  - Added the required column `datadeChegada` to the `controledeEstabilizadores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `problema` to the `controledeEstabilizadores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statusEstabilizadores_id` to the `controledeEstabilizadores` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "controledeEstabilizadores" DROP CONSTRAINT "controledeEstabilizadores_statusCompras_id_fkey";

-- AlterTable
ALTER TABLE "controledeEstabilizadores" DROP COLUMN "datadeEntrega",
DROP COLUMN "statusCompras_id",
ADD COLUMN     "datadeChegada" TEXT NOT NULL,
ADD COLUMN     "problema" TEXT NOT NULL,
ADD COLUMN     "statusEstabilizadores_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "controledeEstabilizadores" ADD CONSTRAINT "controledeEstabilizadores_statusEstabilizadores_id_fkey" FOREIGN KEY ("statusEstabilizadores_id") REFERENCES "statusestabilizadores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
