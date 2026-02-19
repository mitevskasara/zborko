'use client';
import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { WordCard } from './components/WordCard';
import { Logo } from './components/Logo';
import { cn } from '@/lib/utils';
import api from '@/constants/api';
import { letters } from '@/constants/general';

export default function Home() {
  const [currentWord, setCurrentWord] = useState<IWord | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchRandomWord = async () => {
    setLoading(true);
    const res = await fetch(api.random);
    const word = await res.json();
    setCurrentWord(word);
    setLoading(false);
  };

  const handleNextWord = () => {
    fetchRandomWord();
  };

  useEffect(() => {
    fetchRandomWord();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        fetchRandomWord();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
                  {[1, 2, 3, 4].map((i) => (
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
                      {letters[Math.floor(Math.random() * letters.length)]}
                    </div>
                  ))}
                </div>
                <div className="text-sm flex flex-col justify-center">
                  <span className="font-bold text-zinc-900">10,000+</span>
                  <span className="text-zinc-500">Активни корисници денес</span>
                </div>
              </motion.div>
            </div>

            <div className="flex justify-center md:justify-end w-full">
              <WordCard data={currentWord} onNext={handleNextWord} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
