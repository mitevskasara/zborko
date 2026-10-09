'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import api from '@/app/constants/api';
import { avatarLetters } from '@/app/constants/general';
import type { IWordResponse } from '@/app/types';
import { Logo } from '../components/Logo';
import { WordCard } from '../components/WordCard';
import { usePathname, useRouter } from 'next/navigation';

export default function Home() {
  const [currentWord, setCurrentWord] = useState<IWordResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const param = useMemo(() => {
    const segment = (pathname ?? '').replace(/^\//, '').split('/')[0];
    try {
      return decodeURIComponent(segment);
    } catch {
      return segment;
    }
  }, [pathname]);

  const fetchRandomWord = useCallback(async () => {
    setLoading(true);
    setError(null);
    const res = await fetch(api.random);
    const word = await res.json();
    setCurrentWord(word);
    setLoading(false);
  }, []);

  useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);
      setError(null);
      const res = await fetch(`${api.get}?zbor=${encodeURIComponent(param)}`);
      const body = await res.json();
      if (!active) return;

      if (!res.ok) {
        setCurrentWord(null);
        setError(body?.message ?? 'Зборот не е пронајден');
      } else {
        setCurrentWord(body);
        setError(null);
      }
      setLoading(false);
    })();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        fetchRandomWord();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      active = false;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [param, fetchRandomWord]);

  const handleNextWord = () => {
    fetchRandomWord();
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col font-sans text-zinc-900 selection:bg-emerald-100 selection:text-emerald-900 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-white to-transparent -z-10" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-50" />
      <div className="absolute top-40 -left-20 w-72 h-72 bg-teal-50 rounded-full blur-3xl opacity-50" />

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative z-0">
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center gap-4"
          >
            <Logo size={64} showText={false} className="animate-pulse" />
            <p className="text-zinc-400 text-sm font-medium tracking-widest uppercase">
              Зборко бара збор за тебе...
            </p>
          </motion.div>
        ) : (
          <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="hidden md:block space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-5xl font-bold tracking-tight text-zinc-900 leading-tight">
                  Збогатувајте го <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">
                    вашиот речник
                  </span>
                  ,
                  <br /> ден по ден.
                </h2>
              </motion.div>

              <motion.p
                className="text-lg text-zinc-500 leading-relaxed max-w-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                Откривај и учи нови македонски зборови за побогати разговори.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex gap-4 pt-4"
              >
                <div className="flex -space-x-2">
                  {avatarLetters.map((letter, i) => (
                    <div
                      key={i}
                      className={cn(
                        'w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-xs text-white font-bold',
                        i === 1
                          ? 'bg-emerald-500'
                          : i === 2
                            ? 'bg-teal-500'
                            : i === 3
                              ? 'bg-cyan-500'
                              : 'bg-sky-500'
                      )}
                    >
                      {letter}
                    </div>
                  ))}
                </div>
                <div className="text-sm flex flex-col justify-center">
                  <span className="font-bold text-zinc-900">Збор по збор</span>
                  <span className="text-zinc-500">секој ден</span>
                </div>
              </motion.div>
            </div>

            <div className="flex flex-col items-center md:items-end gap-6 w-full">
              {currentWord?.similarWords?.length ? (
                <div className="w-full max-w-md">
                  <p className="text-sm text-zinc-600 mb-2 text-center md:text-right">
                    <span className="font-semibold text-zinc-900">{param}</span>{' '}
                    не е пронајден. Слични зборови:
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-end">
                    {currentWord.similarWords.map((similar) => (
                      <button
                        key={similar.zbor}
                        onClick={() =>
                          router.push(`/${encodeURIComponent(similar.zbor)}`)
                        }
                        className="px-3 py-1.5 bg-white border border-zinc-200 rounded-full text-sm text-zinc-700 hover:border-emerald-400 hover:text-emerald-700 transition-colors"
                      >
                        {similar.zbor}
                        {similar.vid && (
                          <span className="ml-1.5 text-xs text-zinc-400 italic">
                            {similar.vid}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              <WordCard
                key={currentWord?.id ?? param}
                data={currentWord}
                onNext={handleNextWord}
              />

              {error && (
                <p className="w-full max-w-md text-center text-sm text-zinc-500 bg-zinc-100 rounded-2xl py-6 px-4">
                  {error}
                </p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
