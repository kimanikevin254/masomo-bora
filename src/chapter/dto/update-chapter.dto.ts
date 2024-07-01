import { IsOptional, IsString } from "class-validator";
import { FileSystemStoredFile, HasMimeType, IsFile, MemoryStoredFile } from "nestjs-form-data";

export class UpdateChapterDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    order?: number;

    @IsOptional()
    @IsFile()
    @HasMimeType(['video/mp4', 'video/quicktime', 'video/webm', 'video/ogg'])
    video?: FileSystemStoredFile
}