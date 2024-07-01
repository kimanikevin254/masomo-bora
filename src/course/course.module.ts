import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { AuthService } from 'src/auth/auth.service';

@Module({
  controllers: [CourseController],
  providers: [CourseService, PrismaService, UserService, AuthService]
})
export class CourseModule {}
