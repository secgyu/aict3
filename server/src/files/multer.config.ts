import { BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import type { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { IMAGES_DIR } from '../storage/storage.constants';

const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif'];

export const multerOptions: MulterOptions = {
  storage: diskStorage({
    destination: (_req, _file, cb) => {
      if (!fs.existsSync(IMAGES_DIR)) {
        fs.mkdirSync(IMAGES_DIR, { recursive: true });
      }
      cb(null, IMAGES_DIR);
    },
    // 버그 ② 수정: 기존 코드는 모든 파일을 "<시간>-abc.ext" 로 저장해 충돌/덮어쓰기가 발생했다.
    // uuid 를 사용해 항상 고유한 파일명을 보장한다.
    filename: (_req, file, cb) => {
      const ext = extname(file.originalname).toLowerCase();
      cb(null, `${Date.now()}-${uuidv4()}${ext}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const ext = extname(file.originalname).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return cb(
        new BadRequestException(`허용되지 않은 파일 형식입니다: ${ext}`),
        false,
      );
    }
    cb(null, true);
  },
};
