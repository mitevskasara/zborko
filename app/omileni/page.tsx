'use client';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Heart, Search } from 'lucide-react';
import { WordCard } from '../components/WordCard';
import routes from '@/app/constants/routes';
import { StorageService } from '../core/storage';

export default function Favourites() {
  const favoriteWords: IWord[] = StorageService.get('saved');

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center justify-center p-3 bg-emerald-50 text-emerald-600 rounded-full mb-4"
        >
          <Heart className="w-6 h-6 fill-current" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl font-bold text-zinc-900 tracking-tight mb-4"
        >
          Твојата колекција
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-zinc-500 max-w-md mx-auto"
        >
          Листа со твоите омилени зборови. Повторувај ги редовно за секогаш да
          ти бидат „при рака“ во секојдневниот говор.
        </motion.p>
      </div>

      {favoriteWords.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {favoriteWords.map((word, index) => (
            <motion.div
              key={word.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <WordCard data={word} compact />
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20 bg-white rounded-3xl border border-dashed border-zinc-200"
        >
          <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-4 text-zinc-300">
            <Search size={32} />
          </div>
          <h3 className="text-xl font-semibold text-zinc-900 mb-2">
            Твојата листа е празна
          </h3>
          <p className="text-zinc-500 max-w-sm mx-auto mb-8">
            Почни да откриваш нови зборови и кликни на срцето за да ги зачуваш
            зборовите што сакаш да ги запомниш.
          </p>
          <Link
            href={routes.HOME}
            className="inline-flex items-center px-6 py-3 bg-zinc-900 text-white rounded-full font-medium shadow-lg shadow-zinc-200 hover:shadow-xl hover:scale-105 transition-all active:scale-95"
          >
            Откриј случајни зборови
          </Link>
        </motion.div>
      )}
    </div>
  );
}
