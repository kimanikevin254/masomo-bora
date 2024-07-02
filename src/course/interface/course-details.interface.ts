import { ChapterInterface } from "src/chapter/interfaces/chapter.interface";

export interface CourseCreator {
    userId: string;
    name: string;
    email: string;
}

export interface CourseCategory {
    categoryId: string;
    category: string;
}

export interface CourseDetailsInterface {
    courseId: string;
    title: string;
    description: string;
    category: CourseCategory;
    author: CourseCreator;
    chapters: ChapterInterface[];
    createdAt: Date;
    updatedAt: Date;
}