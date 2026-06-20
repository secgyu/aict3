import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Header,
  NotFoundException,
  Param,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Request } from 'express';
import { FilesService } from './files.service';
import { multerOptions } from './multer.config';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }

  private baseUrl(req: Request): string {
    return `${req.protocol}://${req.get('host')}`;
  }

  @Post()
  @UseInterceptors(FileInterceptor('file', multerOptions))
  upload(
    @UploadedFile() file: Express.Multer.File | undefined,
    @Req() req: Request,
  ) {
    if (!file) {
      throw new BadRequestException({ error: 'No file uploaded' });
    }

    const record = this.filesService.add(file.filename);
    return {
      message: 'File store successfully',
      ...this.filesService.toDto(record, this.baseUrl(req)),
    };
  }

  @Get()
  @Header('Cache-Control', 'no-store')
  list(@Req() req: Request) {
    const baseUrl = this.baseUrl(req);
    return this.filesService
      .list()
      .map((record) => this.filesService.toDto(record, baseUrl));
  }

  @Delete('delete/:filename')
  remove(@Param('filename') filename: string) {
    if (!filename) {
      throw new BadRequestException({ error: 'Filename is required' });
    }

    const deleted = this.filesService.remove(filename);
    if (!deleted) {
      throw new NotFoundException({ error: 'File not found' });
    }

    return { message: 'File deleted successfully' };
  }

  @Post('update')
  update(@Body() body: { id: number | string; filename: string }[]) {
    if (!Array.isArray(body) || body.length === 0) {
      throw new BadRequestException({
        error: 'Invalid data format or empty array',
      });
    }

    this.filesService.updateOrder(body);
    return { message: 'Sort order updated successfully' };
  }
}
