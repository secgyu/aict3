import * as fs from 'fs';
import { dirname } from 'path';

/**
 * 동기 IO 기반의 작은 JSON 파일 저장소.
 * - 읽기/쓰기를 동기로 처리해 단일 요청 내 read-modify-write 사이에 다른 요청이 끼어들지 못하게 한다.
 * - 쓰기는 임시 파일에 먼저 기록 후 rename 하여, 쓰는 도중 전원이 꺼져도 원본이 깨지지 않도록 한다.
 */
export function readJson<T>(filePath: string, fallback: T): T {
  if (!fs.existsSync(filePath)) {
    return fallback;
  }

  try {
    const raw = fs.readFileSync(filePath, 'utf8').trim();
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch (error) {
    console.error(`JSON 파일 읽기 오류 (${filePath}):`, error);
    return fallback;
  }
}

export function writeJson(filePath: string, data: unknown): void {
  const dir = dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const tmpPath = `${filePath}.tmp`;
  fs.writeFileSync(tmpPath, JSON.stringify(data, null, 2), 'utf8');
  fs.renameSync(tmpPath, filePath);
}
