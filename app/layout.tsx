import type { Metadata } from 'next';
import { Manrope, Inter } from 'next/font/google';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Feedback Hub',
  description:
    'A platform for capturing, voting on, and prioritizing user ideas.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-surface text-on-surface font-sans antialiased selection:bg-primary/20">
        <main className="mx-auto max-w-5xl px-6 py-12 md:py-16 space-y-12">
          {children}
        </main>
      </body>
    </html>
  );
}
