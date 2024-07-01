import { Module } from '@nestjs/common';
import { ChapterController } from './chapter.controller';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { ChapterService } from './chapter.service';
import { PrismaService } from 'src/prisma.service';
import { CourseService } from 'src/course/course.service';
import { UserService } from 'src/user/user.service';
import { AuthService } from 'src/auth/auth.service';
import { CloudinaryService } from 'src/cloudinary.service';

@Module({
  controllers: [ChapterController],
  providers: [ChapterService, PrismaService, CourseService, UserService, AuthService, CloudinaryService],
  imports: [NestjsFormDataModule]
})
export class ChapterModule {}
