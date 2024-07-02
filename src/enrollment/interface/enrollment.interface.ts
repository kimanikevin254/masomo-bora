import { CourseDetailsInterface } from "src/course/interface/course-details.interface";

export interface EnrollmentInterface {
    enrollmentId: string;
    enrollmentDate: Date
    course: CourseDetailsInterface;
}