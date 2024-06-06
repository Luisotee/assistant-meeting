-- CreateTable
CREATE TABLE "WAChat" (
    "id" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "OpenRouterConversation" (
    "waChatId" TEXT NOT NULL PRIMARY KEY,
    "memory" TEXT NOT NULL,
    CONSTRAINT "OpenRouterConversation_waChatId_fkey" FOREIGN KEY ("waChatId") REFERENCES "WAChat" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Cache" (
    "key" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL
);
