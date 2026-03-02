import { StorageService } from '@/app/core/storage';
import { useEffect, useState } from 'react';

export default () => {
  const [saved, setSaved] = useState<IWord[]>([]);

  useEffect(() => {
    if (StorageService.get('saved')) {
      setSaved(StorageService.get('saved'));
    }
  }, []);

  return saved;
};
