import type { Metadata } from 'next';
import PolicyContent from './PolicyContent';

export const metadata: Metadata = {
  title: 'Политика за приватност - Зборко',
  description:
    'Политика за приватност на Зборко, македонска веб-екстензија за објаснување на зборови.',
};

export const dynamic = 'force-static';

export default function Privacy() {
  return <PolicyContent />;
}
