import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { EnrollmentDto } from './dto/enrollment.dto';
import { CourseService } from 'src/course/course.service';
import { EnrollmentInterface } from './interface/enrollment.interface';
import { CourseEnrollmentInterface, EnrollmentListInterface } from './interface/enrollment-list.interface';

@Injectable()
export class EnrollmentService {
    constructor(
        private prismaService: PrismaService,
        private courseService: CourseService,
    ){}

    private readonly enrollmentSelect = {
        enrollmentId: true,
        course: {
            select: {
                courseId: true,
                title: true,
                description: true,
                category: true,
                courseCreatedBy: {
                    select: {
                        userId: true,
                        name: true,
                        email: true
                    }
                },
                chapters: {
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
                },
                createdAt: true,
                updatedAt: true
                
            }
        },
        enrollmentDate: true,
    }

    async create(enrollmentDto: EnrollmentDto, userId: string): Promise<any>{
        try {
            const course = await this.courseService.findOne(enrollmentDto.courseId)

            const enrollmentExists = await this.prismaService.enrollment.findFirst({
                where: { courseId: enrollmentDto.courseId, userId }
            })

            if(enrollmentExists) { throw new HttpException('User is already enrolled to this course', HttpStatus.BAD_REQUEST) }

            return await this.prismaService.enrollment.create({
                data: {
                    courseId: course.courseId,
                    userId,
                }
            })
        } catch (error) {
            throw new HttpException(error.message || 'Something went wrong', error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async findAll(userId: string): Promise<EnrollmentListInterface[]>{
        return await this.prismaService.enrollment.findMany({
            where: { userId },
            select: {
                enrollmentId: true,
                course: {
                    select: {
                        courseId: true,
                        title: true,
                        description: true,
                        category: {
                            select: {
                                categoryId: true,
                                category: true
                            }
                        },
                        author: {
                            select: {
                                userId: true,
                                name: true,
                                email: true
                            }
                        },
                        createdAt: true,
                        updatedAt: true
                    }
                },
                enrollmentDate: true,
                active: true
            }
        })        
    }

    async findOne(enrollmentId: string, userId: string): Promise<EnrollmentInterface>{
        const enrollment = await this.prismaService.enrollment.findFirst({
            where: { enrollmentId, userId },
            select: {
                enrollmentId: true,
                enrollmentDate: true,
                course: {
                    select: {
                        courseId: true,
                        title: true,
                        description: true,
                        category: {
                            select: {
                                categoryId: true,
                                category: true,
                            }
                        },
                        author: {
                            select: {
                                userId: true,
                                name: true,
                                email: true,
                            }
                        },
                        chapters: {
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
                        },
                        createdAt: true,
                        updatedAt: true,
                    }
                }
            }
        })

        if(!enrollment) { throw new HttpException('Enrollment not found', HttpStatus.NOT_FOUND) }

        return enrollment
    }

    async unenroll(enrollmentId: string, userId: string){
        const enrollment = await this.findOne(enrollmentId, userId)

        return await this.prismaService.enrollment.update({
            where: { enrollmentId: enrollment.enrollmentId },
            data: { active: false }
        })
    }
}