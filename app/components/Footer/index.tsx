import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full py-6 text-center text-zinc-400 text-sm">
      <p>
        &copy; {new Date().getFullYear()} Зборко. Спонзорирано од мерак ·{' '}
        <Link
          href="/privacy"
          className="hover:text-zinc-600 underline underline-offset-2"
        >
          Политика за приватност
        </Link>
      </p>
    </footer>
  );
}
