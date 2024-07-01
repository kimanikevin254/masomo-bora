import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary'

@Injectable()
export class CloudinaryService {
    // constructor(
    //     private configService: ConfigService,
    // ) {

    //     console.log(this.configService.get<string>('CLOUDINARY_URL'));
    // }
    
    async uploadVideo(fileUrl: string ): Promise<any> {
        try {
            // Use the uploaded file's name as the asset's public ID and 
            // allow overwriting the asset with new versions
            const options = {
                // use_filename: true,
                // unique_filename: false,
                // overwrite: true,
            };
    
            return await cloudinary.uploader.upload(fileUrl, {
                resource_type: 'video',
                folder: 'MasomoBora'
            })
        } catch (error) {
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}