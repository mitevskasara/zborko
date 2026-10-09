import { useEffect, useState } from 'react';
import type { IWord } from '@/app/types';
import { StorageService } from '@/app/core/storage';

export default function useSaved() {
  const [saved, setSaved] = useState<IWord[]>([]);

  useEffect(() => {
    const sync = () => setSaved(StorageService.get('saved') ?? []);
    sync();
    window.addEventListener('zborko:storage', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('zborko:storage', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  return saved;
}
