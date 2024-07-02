import { Module } from '@nestjs/common';
import { EnrollmentController } from './enrollment.controller';
import { EnrollmentService } from './enrollment.service';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { AuthService } from 'src/auth/auth.service';
import { CourseService } from 'src/course/course.service';

@Module({
  controllers: [EnrollmentController],
  providers: [EnrollmentService, PrismaService, UserService, AuthService, CourseService]
})
export class EnrollmentModule {}
