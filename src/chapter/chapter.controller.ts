import { Body, Controller, Get, HttpCode, Param, Post, Put, Req, Request, UseGuards } from '@nestjs/common';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { ChapterService } from './chapter.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ChapterInterface } from './interfaces/chapter.interface';
import { UpdateChapterDto } from './dto/update-chapter.dto';

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

    @Get(':chapterId')
    @HttpCode(200)
    async findOne(@Param('courseId') courseId: string, @Param('chapterId') chapterId: string): Promise<ChapterInterface> {
        return this.chapterService.findOne(courseId, chapterId)
    }

    @Put(':chapterId')
    @HttpCode(200)
    @FormDataRequest({ 
        storage: FileSystemStoredFile,
        fileSystemStoragePath: 'uploads',
        cleanupAfterSuccessHandle: false, 
    })
    async updateOne(@Param('courseId') courseId: string, @Param('chapterId') chapterId: string, @Req() req: any, @Body() updateChapterDto: UpdateChapterDto): Promise<ChapterInterface>{
        return this.chapterService.updateOne(courseId, chapterId, req.user.sub, updateChapterDto)
    }

    @Put(':chpaterId/toggle')
    @HttpCode(200)
    async togglePublishedStatus(@Param('courseId') courseId: string, @Param('chapterId') chapterId: string, @Req() req: any): Promise<ChapterInterface> {
        return this.chapterService.togglePublishedStatus(courseId, chapterId, req.user.sub)
    }
}
