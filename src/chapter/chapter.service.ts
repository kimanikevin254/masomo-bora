import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { CourseService } from 'src/course/course.service';
import { Chapter } from '@prisma/client';
import { CloudinaryService } from 'src/cloudinary.service';
import { ChapterInterface } from './interfaces/chapter.interface';

@Injectable()
export class ChapterService {
    constructor (
        private prismaService: PrismaService,
        private courseService: CourseService,
        private cloudinaryService: CloudinaryService,
    ){}

    async create(id: string, createChapterDto: CreateChapterDto, userId: string): Promise<ChapterInterface>{
        try {
            const course = await this.courseService.findOne(id)

            // Confirm that user owns the course
            if(course.createdBy !== userId) { throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED) }

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
                select: {
                    chapterId: true,
                    courseId: true,
                    title: true,
                    description: true,
                    videoUrl: true,
                    order: true,
                    createdAt: true,
                    updatedAt: true
                }
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
                orderBy: { order: 'asc' }
            })
        } catch (error) {
            throw new HttpException(error.message || 'Something went wrong', error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
