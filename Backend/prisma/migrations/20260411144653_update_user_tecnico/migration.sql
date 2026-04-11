-- AlterTable
ALTER TABLE "users" ADD COLUMN     "tecnico_id" TEXT;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_tecnico_id_fkey" FOREIGN KEY ("tecnico_id") REFERENCES "tecnico"("id") ON DELETE SET NULL ON UPDATE CASCADE;
