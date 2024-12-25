/*
  Warnings:

  - Added the required column `file_name` to the `Record` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Record" ADD COLUMN     "file_name" TEXT NOT NULL;
