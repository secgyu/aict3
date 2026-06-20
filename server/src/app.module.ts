import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { FilesModule } from './files/files.module';
import { DisplayModule } from './display/display.module';
import { IMAGES_DIR } from './storage/storage.constants';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: IMAGES_DIR,
      serveRoot: '/images',
    }),
    FilesModule,
    DisplayModule,
  ],
})
export class AppModule { }
