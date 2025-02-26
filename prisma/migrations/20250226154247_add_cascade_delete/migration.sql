/*
  Warnings:

  - The primary key for the `Harvest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Harvest` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Farm" DROP CONSTRAINT "Farm_ruralProducerCpfCnpj_fkey";

-- DropForeignKey
ALTER TABLE "Harvest" DROP CONSTRAINT "Harvest_farmId_fkey";

-- AlterTable
ALTER TABLE "Harvest" DROP CONSTRAINT "Harvest_pkey",
DROP COLUMN "id",
ALTER COLUMN "year" SET DATA TYPE TEXT,
ADD CONSTRAINT "Harvest_pkey" PRIMARY KEY ("year");

-- AlterTable
ALTER TABLE "RuralProducer" ADD CONSTRAINT "RuralProducer_pkey" PRIMARY KEY ("cpfCnpj");

-- DropIndex
DROP INDEX "RuralProducer_cpfCnpj_key";

-- AddForeignKey
ALTER TABLE "Farm" ADD CONSTRAINT "Farm_ruralProducerCpfCnpj_fkey" FOREIGN KEY ("ruralProducerCpfCnpj") REFERENCES "RuralProducer"("cpfCnpj") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Harvest" ADD CONSTRAINT "Harvest_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm"("id") ON DELETE CASCADE ON UPDATE CASCADE;
