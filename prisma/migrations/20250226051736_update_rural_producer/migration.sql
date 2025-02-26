-- AlterTable
ALTER TABLE "RuralProducer" ADD CONSTRAINT "RuralProducer_pkey" PRIMARY KEY ("cpfCnpj");

-- DropIndex
DROP INDEX "RuralProducer_cpfCnpj_key";
