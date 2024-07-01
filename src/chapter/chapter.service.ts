import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { CourseService } from 'src/course/course.service';
import { Chapter } from '@prisma/client';
import { CloudinaryService } from 'src/cloudinary.service';
import { ChapterInterface } from './interfaces/chapter.interface';
import { UpdateChapterDto } from './dto/update-chapter.dto';

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
                    published: true,
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
                orderBy: { order: 'asc' },
                select: {
                    chapterId: true,
                    courseId: true,
                    title: true,
                    description: true,
                    videoUrl: true,
                    order: true,
                    published: true,
                    createdAt: true,
                    updatedAt: true,
                }
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
                select: {
                    chapterId: true,
                    courseId: true,
                    title: true,
                    description: true,
                    videoUrl: true,
                    order: true,
                    published: true,
                    createdAt: true,
                    updatedAt: true,
                }
            })

            if(!chapter) { throw new HttpException('Chapter does not exist', HttpStatus.NOT_FOUND) }

            return chapter
        } catch (error) {
            throw new HttpException(error.message || 'Something went wrong', error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async updateOne(courseId: string, chapterId: string, userId: string, updateChapterDto: UpdateChapterDto): Promise<ChapterInterface> {
        try {
            const course = await this.courseService.findOne(courseId)

            if(!course) { throw new HttpException('Course does not exist', HttpStatus.NOT_FOUND) }

            const chapter = await this.prismaService.chapter.findUnique({
                where: { courseId, chapterId }
            })

            if(!chapter) { throw new HttpException('Chapter does not exist', HttpStatus.NOT_FOUND) }

            if(course.createdBy !== userId) { throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED) }

            if(updateChapterDto.video) {
                const { asset_id, public_id, secure_url } = await this.cloudinaryService.uploadVideo(updateChapterDto.video.path)

                // Remove video key
                const { video, ...rest } = updateChapterDto

                return await this.prismaService.chapter.update({
                    where: { chapterId: chapter.chapterId, courseId: course.courseId },
                    data: { 
                        ...rest,
                        cloudinaryAssetId: asset_id,
                        cloudinaryPublicId: public_id,
                        videoUrl: secure_url
                    },
                    select: {
                        chapterId: true,
                        courseId: true,
                        title: true,
                        description: true,
                        videoUrl: true,
                        order: true,
                        published: true,
                        createdAt: true,
                        updatedAt: true,
                    }
                })
            } else {
                return await this.prismaService.chapter.update({
                    where: { chapterId: chapter.chapterId, courseId: course.courseId },
                    data: { 
                        ...updateChapterDto
                     },
                    select: {
                        chapterId: true,
                        courseId: true,
                        title: true,
                        description: true,
                        videoUrl: true,
                        order: true,
                        published: true,
                        createdAt: true,
                        updatedAt: true,
                    }
                })
            }
        } catch (error) {
            throw new HttpException(error.message || 'Something went wrong', error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async togglePublishedStatus(courseId: string, chapterId: string, userId: string): Promise<ChapterInterface> {
        try {
            const course = await this.courseService.findOne(courseId)

            if(!course) { throw new HttpException('Course does not exist', HttpStatus.NOT_FOUND) }

            const chapter = await this.prismaService.chapter.findUnique({
                where: { courseId, chapterId }
            })

            if(!chapter) { throw new HttpException('Chapter does not exist', HttpStatus.NOT_FOUND) }

            if(course.createdBy !== userId) { throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED) }

            return await this.prismaService.chapter.update({
                where: { chapterId: chapter.chapterId, courseId: course.courseId },
                data: { published: !chapter.published },
                select: {
                    chapterId: true,
                    courseId: true,
                    title: true,
                    description: true,
                    videoUrl: true,
                    order: true,
                    published: true,
                    createdAt: true,
                    updatedAt: true,
                }
            })
        } catch (error) {
            throw new HttpException(error.message || 'Something went wrong', error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
