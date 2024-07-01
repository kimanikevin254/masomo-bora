import { Body, Controller, Get, HttpCode, Param, Post, Request, UseGuards } from '@nestjs/common';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { ChapterService } from './chapter.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Chapter } from '@prisma/client';
import { ChapterInterface } from './interfaces/chapter.interface';

@Controller('course/:courseId/chapter')
@UseGuards(AuthGuard)
export class ChapterController {
    constructor (
        private chapterService: ChapterService
    ){}

    @Post()
    @HttpCode(201)
    @FormDataRequest({ 
        storage: FileSystemStoredFile,
        fileSystemStoragePath: 'uploads',
        cleanupAfterSuccessHandle: false, 
    })
    async create(@Param('courseId') courseId: string, @Body() createChapterDto: CreateChapterDto, @Request() req: any): Promise<ChapterInterface>{
        return this.chapterService.create(courseId, createChapterDto, req.user.sub)
    }

    @Get()
    @HttpCode(200)
    async findAll(@Param('courseId') courseId: string): Promise<ChapterInterface[]> {
        return this.chapterService.findAll(courseId)
    }

}
