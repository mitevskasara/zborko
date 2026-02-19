import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractExamples(text: string | undefined) {
  if (!text) return { znacenje: '', primeri: [] };

  const sentences = text
    .split(/(?<!\b(?:сл|дем|Дем|пр|Пр|прав|Прав))\./)
    .map((s) => s.trim());

  const znacenje = sentences.shift() || '';
  const primeri = sentences.filter(Boolean);

  return { znacenje, primeri };
}
