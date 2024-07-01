/*
  Warnings:

  - You are about to alter the column `order` on the `Chapter` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Chapter" (
    "chapterId" TEXT NOT NULL PRIMARY KEY,
    "courseId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "cloudinaryAssetId" TEXT NOT NULL,
    "cloudinaryPublicId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Chapter_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("courseId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Chapter" ("chapterId", "cloudinaryAssetId", "cloudinaryPublicId", "courseId", "createdAt", "description", "order", "title", "updatedAt", "videoUrl") SELECT "chapterId", "cloudinaryAssetId", "cloudinaryPublicId", "courseId", "createdAt", "description", "order", "title", "updatedAt", "videoUrl" FROM "Chapter";
DROP TABLE "Chapter";
ALTER TABLE "new_Chapter" RENAME TO "Chapter";
CREATE UNIQUE INDEX "Chapter_chapterId_key" ON "Chapter"("chapterId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
