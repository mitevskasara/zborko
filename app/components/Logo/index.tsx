import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className,
  size = 40,
  showText = true,
}) => {
  return (
    <div className={cn('flex items-center gap-3 select-none', className)}>
      <motion.div
        className="relative bg-zinc-900 rounded-xl flex items-center justify-center text-white shadow-lg shadow-zinc-200"
        style={{ width: size, height: size }}
        whileHover={{ rotate: 5, scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <Image src="assets/logo.svg" alt="logo" width={size} height={size} />
        <motion.div
          className="absolute -top-1 -right-1 bg-emerald-400 rounded-full border-2 border-white"
          style={{ width: size * 0.3, height: size * 0.3 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
        />
      </motion.div>

      {showText && (
        <motion.span
          className="font-bold text-xl tracking-tight text-zinc-900"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <span className="text-emerald-500">Збор</span>ко
        </motion.span>
      )}
    </div>
  );
};
