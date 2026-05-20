/*
  Warnings:

  - Added the required column `foto_perfil` to the `usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `foto_perfil` VARCHAR(191) NOT NULL;
