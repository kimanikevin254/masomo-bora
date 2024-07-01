import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { Course, CourseCategory } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseDetailsInterface } from './interface/course-details.interface';

@Injectable()
export class CourseService {
    constructor(
        private prismaService: PrismaService,
        private userService: UserService,
    ) {}

    async create(createCourseDto: CreateCourseDto, userEmail: string): Promise<Course> {
        try {
            // Check if category exists
            const categoryExists = await this.prismaService.courseCategory.findUnique({
                where: { categoryId: createCourseDto.categoryId }
            })

            if(!categoryExists) { throw new HttpException('Category does not exist', HttpStatus.BAD_REQUEST) } 

            // Retrieve user
            const user = await this.userService.findOneByEmail(userEmail)

            // Create course
            return await this.prismaService.course.create({
                data: {
                    ...createCourseDto,
                    createdBy: user.userId
                }
            })
        } catch (error) {
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async findAll(): Promise<Course[]> {
        return await this.prismaService.course.findMany({
            include: { category: true }
        })
    }

    async findAllCategories(): Promise<CourseCategory[]> {
        return await this.prismaService.courseCategory.findMany({})
    }

    async findOne(id: string): Promise<CourseDetailsInterface> {
        // Retrieve course
        const course = await this.prismaService.course.findUnique({
            where: { courseId: id },
            include: { 
                category: true, 
                courseCreatedBy: true,
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
                        updatedAt: true
                    },
                    orderBy: {
                        order: 'asc'
                    }
                }, 
            }
        })

        if(!course) { throw new HttpException('Course not found', HttpStatus.NOT_FOUND) }

        return {
            courseId: course.courseId,
            title: course.title,
            description: course.description,
            category: course.category,
            createdBy: {
                userId: course.courseCreatedBy.userId,
                name: course.courseCreatedBy.name,
                email: course.courseCreatedBy.email
            },
            chapters: course.chapters,
            createdAt: course.createdAt,
            updateAt: course.updatedAt
        }
    }

    async findCourseByCategory(id: string): Promise<CourseCategory> {
        const category = await this.prismaService.courseCategory.findUnique({ where: { categoryId: id }, include: { courses: true } })

        if(!category) { throw new HttpException('Category does not exist', HttpStatus.NOT_FOUND) }

        return category
    }

    async updateOne(id: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
        try {
            // Retrieve course
            const course = await this.prismaService.course.findUnique({ where: { courseId: id } })

            if(!course) { throw new HttpException('Course not found', HttpStatus.NOT_FOUND) }

            // Update the course
            return await this.prismaService.course.update({
                where: { courseId: id },
                data: { ...updateCourseDto }
            })
        } catch (error) {
            throw new HttpException(error.message || 'Something went wrong', error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
