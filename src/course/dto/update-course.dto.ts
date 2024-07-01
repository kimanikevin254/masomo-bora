import { IsOptional, IsString } from "class-validator";

export class UpdateCourseDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;
    
    @IsString()
    @IsOptional()
    categoryId?: string;
}