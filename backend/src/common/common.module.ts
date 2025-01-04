import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ImageUploadModule } from './image-upload/image-upload.module';

@Module({
    imports: [
        DatabaseModule,
        ImageUploadModule,
    ],
})
export class CommonModule {}
