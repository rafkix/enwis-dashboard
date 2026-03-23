-- CreateTable
CREATE TABLE "News" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL DEFAULT 'news',
    "coverImage" TEXT,
    "views" INTEGER NOT NULL DEFAULT 0,
    "sponsorName" TEXT,
    "sponsorUrl" TEXT,
    "ctaLabel" TEXT,
    "ctaUrl" TEXT,
    "websitePublished" BOOLEAN NOT NULL DEFAULT false,
    "websitePublishedAt" DATETIME,
    "telegramPublished" BOOLEAN NOT NULL DEFAULT false,
    "telegramPublishedAt" DATETIME,
    "telegramMessageId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "NewsTranslation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "newsId" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "contentJson" TEXT NOT NULL,
    CONSTRAINT "NewsTranslation_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "NewsMedia" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "newsId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "NewsMedia_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "News_createdAt_idx" ON "News"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "NewsTranslation_locale_slug_key" ON "NewsTranslation"("locale", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "NewsTranslation_newsId_locale_key" ON "NewsTranslation"("newsId", "locale");

-- CreateIndex
CREATE INDEX "NewsMedia_newsId_idx" ON "NewsMedia"("newsId");
