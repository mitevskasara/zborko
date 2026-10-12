'use client';
import React, { Fragment, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Share2, Heart, Copy, Check } from 'lucide-react';
import { cn, extractExamples } from '@/lib/utils';
import { StorageService } from '@/app/core/storage';
import type { IWord } from '@/app/types';

interface WordCardProps {
  data: IWord | null;
  compact?: boolean;
  onNext?: () => void;
}

export const WordCard: React.FC<WordCardProps> = ({
  data,
  onNext,
  compact = false,
}) => {
  const [isLiked, setIsLiked] = useState(
    data ? StorageService.exists('saved', data) : false
  );
  const [copied, setCopied] = useState(false);
  const { znacenje, primeri } = extractExamples(data?.znacenje);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${data?.zbor}: ${data?.znacenje}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = (word: IWord | null) => {
    if (word && isLiked) {
      StorageService.remove('saved', word);
      setIsLiked(false);
    } else if (word) {
      StorageService.save('saved', word);
      setIsLiked(true);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto perspective-1000">
      <AnimatePresence mode="wait">
        <motion.div
          key={data?.id}
          initial={{ opacity: 0, y: 20, rotateX: -10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          exit={{ opacity: 0, y: -20, rotateX: 10 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden border border-zinc-100 relative group"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-teal-500" />

          <div className="p-8 pb-6">
            <div className="flex justify-between items-start mb-6">
              {!compact ? (
                <span className="px-3 py-1 rounded-full bg-zinc-100 text-zinc-500 text-xs font-medium uppercase tracking-wider">
                  Збор на денот
                </span>
              ) : (
                <h1 className="text-4xl font-serif font-bold text-zinc-900 mb-2 tracking-tight">
                  {data?.zbor}
                </h1>
              )}
              <div className="flex gap-2">
                <button
                  onClick={() => handleSave(data)}
                  className={cn(
                    'p-2 rounded-full transition-colors',
                    isLiked
                      ? 'text-rose-500 bg-rose-50'
                      : 'text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600'
                  )}
                  aria-label="Add to favorites"
                >
                  <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>

            <div className="mb-2">
              {!compact && (
                <h1 className="text-4xl font-serif font-bold text-zinc-900 mb-2 tracking-tight">
                  {data?.zbor}
                </h1>
              )}
              <div className="flex items-center gap-3 text-zinc-500 font-medium">
                <span className="text-lg">{data?.rod}</span>
                {(data?.rod || data?.vid) && (
                  <span className="w-1 h-1 rounded-full bg-zinc-300" />
                )}
                <span className="italic">{data?.vid}</span>
              </div>
            </div>

            <div className="my-8 space-y-6">
              <div>
                <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                  Дефиниција
                </h3>
                <p className="text-lg text-zinc-800 leading-relaxed font-serif">
                  {znacenje}
                </p>
              </div>
              {primeri?.length > 0 && (
                <div className="pl-4 border-l-2 border-emerald-100">
                  <h3 className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">
                    Пример
                  </h3>
                  <p className="text-zinc-600 italic">
                    {primeri?.map(
                      (primer, i) =>
                        primer && (
                          <Fragment key={i}>
                            &ldquo;{primer?.trim()}&rdquo;
                            <br />
                          </Fragment>
                        )
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-zinc-50 px-8 py-4 border-t border-zinc-100 flex justify-between items-center">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              {copied ? (
                <Check size={16} className="text-green-500" />
              ) : (
                <Copy size={16} />
              )}
              {copied ? 'Копирано!' : 'Копирај'}
            </button>
            <button
              className="p-2 rounded-full hover:bg-zinc-200 text-zinc-400 hover:text-zinc-600 transition-colors"
              onClick={() => {
                if (navigator.share) {
                  navigator
                    .share({
                      title: `Збор на денот: ${data?.zbor}`,
                      text: `/${data?.zbor}`,
                      url: `/${data?.zbor}`,
                    })
                    .catch(() => {});
                }
              }}
            >
              <Share2 size={16} />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {!compact && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={onNext}
            className="group flex items-center gap-2 px-6 py-3 bg-zinc-900 text-white rounded-full font-medium shadow-lg shadow-zinc-200 hover:shadow-xl hover:scale-105 transition-all active:scale-95"
          >
            <span>Следен Збор</span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};
