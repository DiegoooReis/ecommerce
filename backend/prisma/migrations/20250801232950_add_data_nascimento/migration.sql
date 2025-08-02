/*
  Warnings:

  - Added the required column `dataNascimento` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "dataNascimento" TIMESTAMP(3) NOT NULL;
