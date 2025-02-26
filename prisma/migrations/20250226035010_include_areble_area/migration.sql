/*
  Warnings:

  - Added the required column `arebleArea` to the `Farm` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Farm" ADD COLUMN     "arebleArea" INTEGER NOT NULL;
