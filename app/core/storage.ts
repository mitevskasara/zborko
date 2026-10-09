import type { IWord } from '@/app/types';

export const StorageService = {
  get(key: string): IWord[] {
    if (typeof window === 'undefined') {
      return [];
    }

    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  exists(key: string, value: IWord) {
    if (typeof window !== 'undefined') {
      const existing = this.get(key);
      return existing.some(
        (item: IWord) => JSON.stringify(item) === JSON.stringify(value)
      );
    }
    return false;
  },

  save(key: string, value: IWord) {
    if (typeof window !== 'undefined') {
      const existing = this.get(key);

      const isDuplicate = existing.some(
        (item: IWord) => JSON.stringify(item) === JSON.stringify(value)
      );
      if (!isDuplicate) {
        existing.push(value);
        localStorage.setItem(key, JSON.stringify(existing));
        window.dispatchEvent(new Event('zborko:storage'));
      }

      return !isDuplicate;
    }
  },

  remove(key: string, value: IWord) {
    if (typeof window !== 'undefined') {
      const existing = this.get(key);
      const filtered = existing.filter(
        (item: IWord) => JSON.stringify(item) !== JSON.stringify(value)
      );
      localStorage.setItem(key, JSON.stringify(filtered));
      window.dispatchEvent(new Event('zborko:storage'));
    }
  },

  clear(key: string) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
      window.dispatchEvent(new Event('zborko:storage'));
    }
  },
};
