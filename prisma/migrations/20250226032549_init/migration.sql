-- CreateTable
CREATE TABLE "RuralProducer" (
    "cpfCnpj" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Farm" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "totalArea" INTEGER NOT NULL,
    "vegetationArea" INTEGER NOT NULL,
    "ruralProducerCpfCnpj" TEXT,

    CONSTRAINT "Farm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Harvest" (
    "id" SERIAL NOT NULL,
    "year" TIMESTAMP(3) NOT NULL,
    "crop" TEXT[],
    "farmId" INTEGER NOT NULL,

    CONSTRAINT "Harvest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RuralProducer_cpfCnpj_key" ON "RuralProducer"("cpfCnpj");

-- AddForeignKey
ALTER TABLE "Farm" ADD CONSTRAINT "Farm_ruralProducerCpfCnpj_fkey" FOREIGN KEY ("ruralProducerCpfCnpj") REFERENCES "RuralProducer"("cpfCnpj") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Harvest" ADD CONSTRAINT "Harvest_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
