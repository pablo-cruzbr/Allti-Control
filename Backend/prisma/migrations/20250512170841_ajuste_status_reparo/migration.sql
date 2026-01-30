/*
  Warnings:

  - You are about to drop the column `status` on the `controleDeAssistenciaTecnica` table. All the data in the column will be lost.
  - Added the required column `statusReparo_id` to the `controleDeAssistenciaTecnica` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "controleDeAssistenciaTecnica" DROP COLUMN "status",
ADD COLUMN     "statusReparo_id" TEXT NOT NULL;

-- DropEnum
DROP TYPE "StatusReparo";

-- CreateTable
CREATE TABLE "StatusReparo" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StatusReparo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "controleDeAssistenciaTecnica" ADD CONSTRAINT "controleDeAssistenciaTecnica_statusReparo_id_fkey" FOREIGN KEY ("statusReparo_id") REFERENCES "StatusReparo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
