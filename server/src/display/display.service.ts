import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DISPLAY_SETTINGS_FILE } from '../storage/storage.constants';
import { readJson, writeJson } from '../storage/json-store';

interface DisplaySettings {
  slideMode: number;
  delaySec: number;
}

const DEFAULT_SETTINGS: DisplaySettings = { slideMode: 0, delaySec: 15 };

@Injectable()
export class DisplayService {
  getTransitionTime(): number {
    try {
      const config = readJson<DisplaySettings>(
        DISPLAY_SETTINGS_FILE,
        DEFAULT_SETTINGS,
      );
      return config.delaySec;
    } catch (error) {
      console.error('Error reading config file:', error);
      throw new InternalServerErrorException({
        message: 'Failed to read delay time.',
      });
    }
  }

  setTransitionTime(count: number): void {
    try {
      const config = readJson<DisplaySettings>(
        DISPLAY_SETTINGS_FILE,
        DEFAULT_SETTINGS,
      );
      config.delaySec = count;
      writeJson(DISPLAY_SETTINGS_FILE, config);
    } catch (error) {
      console.error('Error updating config file:', error);
      throw new InternalServerErrorException({
        message: 'Failed to update delay time.',
      });
    }
  }
}
