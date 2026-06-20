import { join } from 'path';

export const STORAGE_DIR =
  process.env.STORAGE_DIR ?? join(process.cwd(), 'src', 'store');

export const IMAGES_DIR = join(STORAGE_DIR, 'images');
export const IMAGE_DATA_FILE = join(STORAGE_DIR, 'imageData.json');
export const DISPLAY_SETTINGS_FILE = join(STORAGE_DIR, 'displayTransitionTime.json');
