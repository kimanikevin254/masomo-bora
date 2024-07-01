import { Body, Controller, Get, HttpCode, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { CourseService } from './course.service';
import { Course, CourseCategory } from '@prisma/client';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('course')
export class CourseController {
    constructor(private courseService: CourseService) {}

    // Create course
    @Post()
    @HttpCode(201)
    @UseGuards(AuthGuard)
    async create(@Body() createCourseDto: CreateCourseDto, @Req() req: any){
        return await this.courseService.create(createCourseDto, req.user.email)
    }

    // Get all courses
    @Get()
    @HttpCode(200)
    async findAll(): Promise<Course[]> {
        return await this.courseService.findAll()
    }

    // Get all course categories
    @Get('categories')
    @HttpCode(200)
    async findCategories(): Promise<CourseCategory[]> {
        return this.courseService.findAllCategories()
    }

    // Get course details
    @Get(':id')
    @HttpCode(200)
    async findOne(@Param('id') id: string ): Promise<Course>  {
        return await this.courseService.findOne(id)
    }
    
    // Get course category details
    @Get('categories/:id')
    @HttpCode(200)
    async findCourseByCategory(@Param('id') id: string): Promise<CourseCategory>  {
        return await this.courseService.findCourseByCategory(id)
    }

    // Update course
    @Put(':id')
    @HttpCode(200)
    async updateOne(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
        return this.courseService.updateOne(id, updateCourseDto)
    }
}
