import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CourseModule } from './course/course.module';
import { ChapterModule } from './chapter/chapter.module';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { EnrollmentModule } from './enrollment/enrollment.module';

@Module({
  imports: [
    AuthModule, 
    UserModule, 
    ConfigModule.forRoot({
      isGlobal: true,
    }), 
    CourseModule, 
    ChapterModule,
    NestjsFormDataModule,
    EnrollmentModule
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}