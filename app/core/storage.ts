export const StorageService = {
  get(key: string) {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    }
  },

  exists(key: string, value: IWord) {
    if (typeof window !== 'undefined') {
      const existing = this.get(key);
      return existing.some(
        (item: IWord) => JSON.stringify(item) === JSON.stringify(value)
      );
    }
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
    }
  },

  clear(key: string) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  },
};
