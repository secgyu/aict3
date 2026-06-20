import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { basename, join } from 'path';
import { IMAGES_DIR, IMAGE_DATA_FILE } from '../storage/storage.constants';
import { readJson, writeJson } from '../storage/json-store';

export interface ImageRecord {
  id: number;
  filename: string;
}

@Injectable()
export class FilesService {
  list(): ImageRecord[] {
    const data = readJson<ImageRecord[]>(IMAGE_DATA_FILE, []);
    if (!Array.isArray(data)) {
      console.error('JSON 데이터가 배열이 아닙니다:', data);
      return [];
    }
    // 과거 데이터는 절대 URL 이 담긴 path 필드를 갖고 있을 수 있으나, 여기서는 id/filename 만 사용한다.
    return data.map((item) => ({ id: item.id, filename: item.filename }));
  }

  add(filename: string): ImageRecord {
    const records = this.list();
    const nextId = records.length
      ? Math.max(...records.map((r) => Number(r.id) || 0)) + 1
      : 1;

    const record: ImageRecord = { id: nextId, filename };
    records.push(record);
    writeJson(IMAGE_DATA_FILE, records);
    return record;
  }

  remove(filename: string): boolean {
    const records = this.list();
    const index = records.findIndex((r) => r.filename === filename);
    if (index === -1) {
      return false;
    }

    const filePath = join(IMAGES_DIR, basename(records[index].filename));
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (error) {
        console.error('파일 삭제 오류:', error);
      }
    }

    records.splice(index, 1);
    writeJson(IMAGE_DATA_FILE, records);
    return true;
  }

  updateOrder(items: { id: number | string; filename: string }[]): void {
    const records: ImageRecord[] = items.map((item) => ({
      id: Number(item.id),
      filename: item.filename,
    }));
    writeJson(IMAGE_DATA_FILE, records);
  }

  /**
   * 버그 ① 수정: 업로드 시점의 host 를 저장하지 않고, 요청이 들어온 host 기준으로 매번 절대 URL 을 생성한다.
   * 클라이언트(TV)가 접속한 주소가 곧 이미지 주소가 되므로 배포 환경이 바뀌어도 항상 올바르게 동작한다.
   */
  toDto(record: ImageRecord, baseUrl: string) {
    return {
      id: record.id,
      filename: record.filename,
      path: `${baseUrl}/images/${record.filename}`,
    };
  }
}
