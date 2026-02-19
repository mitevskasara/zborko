'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import routes from '@/app/constants/routes';
import { Logo } from '../Logo';
import { StorageService } from '@/app/core/storage';

export default function Header() {
  const pathname = usePathname();
  // const { data: session } = useSession();
    const favorites: IWord[] = StorageService.get('saved');

function isActive(path: string) {
return path == pathname.replace('/', '');
};

  return (
    <header className="w-full max-w-5xl mx-auto px-6 py-6 flex justify-between items-center z-10">
      <Logo />
      <nav className="hidden md:flex gap-6 text-sm font-medium text-zinc-500">
        <Link href={routes.HOME}           
        className={`${pathname == '/' ? 'text-zinc-900' : 'transition-colors' }`}>
          Збор на денот
        </Link>
        <Link
          href={routes.FAVOURITES}
          className={`hover:text-zinc-900 ${isActive(routes.FAVOURITES) ? 'text-zinc-900' : 'transition-colors' }`}
        >
          Омилени&nbsp;
            {favorites.length > 0 && (
              <span className="bg-emerald-100 text-emerald-700 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                {favorites.length}
              </span>
            )}
        </Link>
        <Link
          href={routes.ABOUT}
          className={` ${isActive(routes.ABOUT) ? 'text-zinc-900' : 'transition-colors' }`}
        >
          За Зборко
        </Link>
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
