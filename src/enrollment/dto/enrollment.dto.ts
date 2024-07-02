import { IsString } from "class-validator";

export class EnrollmentDto {
    @IsString()
    courseId: string;
}