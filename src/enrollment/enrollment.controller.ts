import { Body, Controller, Get, HttpCode, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { EnrollmentDto } from './dto/enrollment.dto';
import { EnrollmentInterface } from './interface/enrollment.interface';
import { EnrollmentService } from './enrollment.service';
import { Enrollment } from '@prisma/client';
import { EnrollmentListInterface } from './interface/enrollment-list.interface';

@Controller('enrollment')
@UseGuards(AuthGuard)
export class EnrollmentController {
    constructor(
        private enrollmentService: EnrollmentService,
    ){}

    @Post()
    @HttpCode(201)
    async create(@Body() enrollmentDto: EnrollmentDto, @Req() req: any): Promise<Enrollment>{
        return await this.enrollmentService.create(enrollmentDto, req.user.sub)
    }

    @Get()
    @HttpCode(200)
    async findAll( @Req() req: any): Promise<EnrollmentListInterface[]>{
        return await this.enrollmentService.findAll(req.user.sub)
    }

    @Get(':enrollmentId')
    @HttpCode(200)
    async findOne(@Param('enrollmentId') enrollmentId: string, @Req() req: any): Promise<EnrollmentInterface>{
        return await this.enrollmentService.findOne(enrollmentId, req.user.sub)
    }
}
