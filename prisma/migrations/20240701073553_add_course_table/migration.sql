-- CreateTable
CREATE TABLE "CourseCategory" (
    "categoryId" TEXT NOT NULL PRIMARY KEY,
    "category" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Course" (
    "courseId" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Course_category_fkey" FOREIGN KEY ("category") REFERENCES "CourseCategory" ("categoryId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Course_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "CourseCategory_categoryId_key" ON "CourseCategory"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Course_courseId_key" ON "Course"("courseId");
