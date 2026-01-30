/*
  Warnings:

  - You are about to drop the `StatusReparo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "controleDeAssistenciaTecnica" DROP CONSTRAINT "controleDeAssistenciaTecnica_statusReparo_id_fkey";

-- DropTable
DROP TABLE "StatusReparo";

-- CreateTable
CREATE TABLE "statusReparo" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "statusReparo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "controleDeAssistenciaTecnica" ADD CONSTRAINT "controleDeAssistenciaTecnica_statusReparo_id_fkey" FOREIGN KEY ("statusReparo_id") REFERENCES "statusReparo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
