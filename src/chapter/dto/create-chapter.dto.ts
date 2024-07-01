import { IsString } from "class-validator";
import { FileSystemStoredFile, HasMimeType, IsFile, MemoryStoredFile } from "nestjs-form-data";

export class CreateChapterDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsString()
    order: number;

    @IsFile()
    @HasMimeType(['video/mp4', 'video/quicktime', 'video/webm', 'video/ogg'])
    video: FileSystemStoredFile
}