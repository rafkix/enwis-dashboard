/*
  Warnings:

  - You are about to drop the column `telegramMessageId` on the `News` table. All the data in the column will be lost.
  - You are about to drop the column `telegramPublishedAt` on the `News` table. All the data in the column will be lost.
  - You are about to drop the column `websitePublishedAt` on the `News` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "ShortLink" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "targetUrl" TEXT NOT NULL,
    "newsId" TEXT,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ShortLink_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_News" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "coverImage" TEXT,
    "sponsorName" TEXT,
    "sponsorUrl" TEXT,
    "ctaLabel" TEXT,
    "ctaUrl" TEXT,
    "websitePublished" BOOLEAN NOT NULL DEFAULT false,
    "telegramPublished" BOOLEAN NOT NULL DEFAULT false,
    "views" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_News" ("coverImage", "createdAt", "ctaLabel", "ctaUrl", "id", "sponsorName", "sponsorUrl", "telegramPublished", "type", "updatedAt", "views", "websitePublished") SELECT "coverImage", "createdAt", "ctaLabel", "ctaUrl", "id", "sponsorName", "sponsorUrl", "telegramPublished", "type", "updatedAt", "views", "websitePublished" FROM "News";
DROP TABLE "News";
ALTER TABLE "new_News" RENAME TO "News";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "ShortLink_code_key" ON "ShortLink"("code");

-- CreateIndex
CREATE UNIQUE INDEX "ShortLink_newsId_key" ON "ShortLink"("newsId");
