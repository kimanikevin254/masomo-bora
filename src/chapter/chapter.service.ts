import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary.service';
import { CourseService } from 'src/course/course.service';
import { PrismaService } from 'src/prisma.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { ChapterInterface } from './interfaces/chapter.interface';

@Injectable()
export class ChapterService {
    constructor (
        private prismaService: PrismaService,
        private courseService: CourseService,
        private cloudinaryService: CloudinaryService,
    ){}

    private readonly chapterSelect = {
        chapterId: true,
        courseId: true,
        title: true,
        description: true,
        videoUrl: true,
        order: true,
        published: true,
        createdAt: true,
        updatedAt: true,
    };

    private async findChapterAndCheckOwnerShip(courseId: string, chapterId: string, userId: string) {
        const course = await this.courseService.findOne(courseId)
        if(!course) { throw new HttpException('Course does not exist', HttpStatus.NOT_FOUND) }

        if(course.createdBy !== userId) { throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED) }

        if(chapterId !== '') {
            const chapter = await this.prismaService.chapter.findUnique({
                where: { chapterId },
                select: this.chapterSelect,
            });
        
            if (!chapter) { throw new HttpException('Chapter does not exist', HttpStatus.NOT_FOUND) }
        
            return { course, chapter }
        } else return { course }
    }

    async create(courseId: string, createChapterDto: CreateChapterDto, userId: string): Promise<ChapterInterface>{
        try {
            const { course } = await this.findChapterAndCheckOwnerShip(courseId, '', userId)

            const { title, description, order, video } = createChapterDto

            // Upload video
            const { asset_id, public_id, secure_url } = await this.cloudinaryService.uploadVideo(video.path)

            return await this.prismaService.chapter.create({
                data: {
                    courseId: course.courseId,
                    title,
                    description,
                    videoUrl: secure_url,
                    order: Number(order),
                    cloudinaryAssetId: asset_id,
                    cloudinaryPublicId: public_id
                },
                select: this.chapterSelect
            })
        } catch (error) {
            console.log(error);
            throw new HttpException(error.message || 'Something went wrong', error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async findAll(id: string): Promise<ChapterInterface[]> {
        try {
            const course = await this.courseService.findOne(id)
            
            return await this.prismaService.chapter.findMany({
                where: { courseId: course.courseId },
                orderBy: { order: 'asc' },
                select: this.chapterSelect
            })
        } catch (error) {
            throw new HttpException(error.message || 'Something went wrong', error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async findOne(courseId: string, chapterId: string): Promise<ChapterInterface> {
        try {
            const course = await this.courseService.findOne(courseId)

            const chapter = await this.prismaService.chapter.findUnique({
                where: { courseId: course.courseId, chapterId },
                select: this.chapterSelect
            })

            if(!chapter) { throw new HttpException('Chapter does not exist', HttpStatus.NOT_FOUND) }

            return chapter
        } catch (error) {
            throw new HttpException(error.message || 'Something went wrong', error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async updateOne(courseId: string, chapterId: string, userId: string, updateChapterDto: UpdateChapterDto): Promise<ChapterInterface> {
        try {
            const { chapter } = await this.findChapterAndCheckOwnerShip(courseId, chapterId, userId)

            const data: any = { ...updateChapterDto }

            if(updateChapterDto.video){
                const { asset_id, public_id, secure_url } = await this.cloudinaryService.uploadVideo(updateChapterDto.video.path)
                data.cloudinaryAssetId = asset_id,
                data.cloudinaryPublicId =  public_id,
                data.videoUrl = secure_url
                
                delete data.video
            }

            return await this.prismaService.chapter.update({
                where: { chapterId: chapter.chapterId },
                data,
                select: this.chapterSelect
            })
        } catch (error) {
            throw new HttpException(error.message || 'Something went wrong', error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async togglePublishedStatus(courseId: string, chapterId: string, userId: string): Promise<ChapterInterface> {
        try {
            const { chapter } = await this.findChapterAndCheckOwnerShip(courseId, chapterId, userId)

            return await this.prismaService.chapter.update({
                where: { chapterId: chapter.chapterId },
                data: { published: !chapter.published },
                select: this.chapterSelect
            })
        } catch (error) {
            throw new HttpException(error.message || 'Something went wrong', error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}