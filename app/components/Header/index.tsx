'use client';

import routes from '@/constants/routes';
import { Logo } from '../Logo';

export default function Header() {
  // const { data: session } = useSession();

  return (
    <header className="w-full max-w-5xl mx-auto px-6 py-6 flex justify-between items-center z-10">
      <Logo />
      <nav className="hidden md:flex gap-6 text-sm font-medium text-zinc-500">
        <a href={routes.HOME} className="hover:text-zinc-900 transition-colors">
          Збор на денот
        </a>
        <a
          href={routes.FAVOURITES}
          className="hover:text-zinc-900 transition-colors"
        >
          Омилени
        </a>
        <a
          href={routes.ABOUT}
          className="hover:text-zinc-900 transition-colors"
        >
          За Зборко
        </a>
      </nav>
      <button className="md:hidden p-2 text-zinc-500">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </header>
  );
}
