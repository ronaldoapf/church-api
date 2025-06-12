/*
  Warnings:

  - Made the column `birthDate` on table `members` required. This step will fail if there are existing NULL values in that column.
  - Made the column `birthMonth` on table `members` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "members" ALTER COLUMN "birthDate" SET NOT NULL,
ALTER COLUMN "birthMonth" SET NOT NULL;
