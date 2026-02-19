import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Providers from './providers';

export const metadata = {
  title: 'Зборко',
  description:
    'Откривај го македонскиот речник збор по збор со Зборко! - Учи случајни зборови секој ден',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* <Providers> */}
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        {/* </Providers> */}
      </body>
    </html>
  );
}
