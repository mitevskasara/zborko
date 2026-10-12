'use client';
import { motion } from 'motion/react';
import { BookOpen, Sparkles, Brain, Coffee, Github } from 'lucide-react';

const features = [
  {
    icon: <Brain className="w-6 h-6 text-emerald-500" />,
    title: 'Тренинг за умот',
    description:
      'Вежбај го мозокот за да не заглавуваш среде реченица. Новите зборови ја подобруваат меморијата и комуникацијата.',
  },
  {
    icon: <Sparkles className="w-6 h-6 text-teal-500" />,
    title: 'Дневно изненадување',
    description:
      'Секој ден те чека нов, случаен македонски бисер. Никогаш не знаеш кој збор ќе ти го освежи речникот денес.',
  },
  {
    icon: <BookOpen className="w-6 h-6 text-cyan-500" />,
    title: 'Побогат речник',
    description:
      'Со секој нов збор градиш сопствено богатство со автентични македонски зборови и изрази.',
  },
];

export default function About() {
  return (
    <div className="w-full max-w-4xl mx-auto mt-20">
      <div className="text-center mb-16 space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight"
        >
          Твојата дневна доза
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">
            &nbsp;македонска
          </span>{' '}
          автентичност.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-zinc-500 max-w-2xl mx-auto leading-relaxed mb-16"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">
            Збор
          </span>
          ко е тука да ти помогне да престанеш да звучиш како лош превод и да ја
          откриеш моќта на вистинскиот македонски збор.
          <br />
          <br />
          Да му го вратиме достоинството на нашиот јазик, збор по збор.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center mb-4">
              {feature.icon}
            </div>
            <h3 className="text-lg font-bold text-zinc-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-zinc-500 leading-relaxed text-sm">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-zinc-900 text-zinc-300 rounded-3xl p-8 md:p-12 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full blur-3xl opacity-10 translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500 rounded-full blur-3xl opacity-10 -translate-x-1/2 translate-y-1/2" />

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-4 max-w-md">
            <h2 className="text-2xl font-bold text-white">
              Зборко - Помалку „онакво“, повеќе македонски.
            </h2>
            <p className="leading-relaxed">
              Заедно во борба против сиромаштијата во речникот.
            </p>
            <div className="flex gap-4 pt-2">
              <a
                href="https://github.com/mitevskasara/zborko"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="p-2 bg-zinc-800 rounded-full hover:bg-zinc-700 transition-colors text-white"
              >
                <Github size={20} />
              </a>
            </div>
          </div>

          <div className="flex-shrink-0 text-center md:text-right">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 rounded-full text-sm font-medium mb-2">
              <Coffee size={16} className="text-amber-400" />
              <span>Спонзорирано од мерак и кофеин</span>
            </div>
            <p className="text-xs text-zinc-500 uppercase tracking-widest font-semibold mt-2">
              Основано 2026
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
