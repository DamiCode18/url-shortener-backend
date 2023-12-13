/*
  Warnings:

  - A unique constraint covering the columns `[shortUrl]` on the table `Url` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `shortUrl` to the `Url` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Url" ADD COLUMN     "shortUrl" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Url_shortUrl_key" ON "Url"("shortUrl");
