export const StorageService = {
  get(key: string) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  },

  save(key: string, value: IWord) {
    const existing = this.get(key);

    const isDuplicate = existing.some(
      (item: string) => JSON.stringify(item) === JSON.stringify(value)
    );

    if (!isDuplicate) {
      existing.push(value);
      localStorage.setItem(key, JSON.stringify(existing));
    }

    return !isDuplicate;
  },

  remove(key: string, value: IWord) {
    const existing = this.get(key);
    const filtered = existing.filter(
      (item: string) => JSON.stringify(item) !== JSON.stringify(value)
    );
    localStorage.setItem(key, JSON.stringify(filtered));
  },

  clear(key: string) {
    localStorage.removeItem(key);
  },
};
