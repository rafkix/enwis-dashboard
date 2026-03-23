-- DropIndex
DROP INDEX "NewsMedia_newsId_idx";

-- AlterTable
ALTER TABLE "NewsMedia" ADD COLUMN "alt" TEXT;
ALTER TABLE "NewsMedia" ADD COLUMN "caption" TEXT;
ALTER TABLE "NewsMedia" ADD COLUMN "thumbnail" TEXT;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_NewsTranslation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "newsId" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT,
    "contentJson" TEXT NOT NULL,
    CONSTRAINT "NewsTranslation_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_NewsTranslation" ("contentJson", "excerpt", "id", "locale", "newsId", "slug", "title") SELECT "contentJson", "excerpt", "id", "locale", "newsId", "slug", "title" FROM "NewsTranslation";
DROP TABLE "NewsTranslation";
ALTER TABLE "new_NewsTranslation" RENAME TO "NewsTranslation";
CREATE INDEX "NewsTranslation_locale_idx" ON "NewsTranslation"("locale");
CREATE INDEX "NewsTranslation_newsId_idx" ON "NewsTranslation"("newsId");
CREATE UNIQUE INDEX "NewsTranslation_newsId_locale_key" ON "NewsTranslation"("newsId", "locale");
CREATE UNIQUE INDEX "NewsTranslation_locale_slug_key" ON "NewsTranslation"("locale", "slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE INDEX "News_websitePublished_websitePublishedAt_idx" ON "News"("websitePublished", "websitePublishedAt");

-- CreateIndex
CREATE INDEX "News_telegramPublished_telegramPublishedAt_idx" ON "News"("telegramPublished", "telegramPublishedAt");

-- CreateIndex
CREATE INDEX "News_type_idx" ON "News"("type");

-- CreateIndex
CREATE INDEX "NewsMedia_newsId_sortOrder_idx" ON "NewsMedia"("newsId", "sortOrder");
