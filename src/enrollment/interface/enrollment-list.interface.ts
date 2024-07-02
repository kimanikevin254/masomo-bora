import { CourseCreator } from "src/course/interface/course-details.interface";


interface CategoryInterface {
    categoryId: string;
    category: string;
}

export interface CourseEnrollmentInterface {
    courseId: string;
    title: string;
    description: string;
    category: CategoryInterface;
    author: CourseCreator;
    createdAt: Date;
    updatedAt: Date;
}

export interface EnrollmentListInterface {
    enrollmentId: string;
    enrollmentDate: Date;
    active: boolean;
    course: CourseEnrollmentInterface;
}