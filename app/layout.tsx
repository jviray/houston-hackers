import type { Metadata } from 'next';
import { Source_Sans_3 } from 'next/font/google';

import '@/styles/globals.css';

import { AppHeader } from '@/components/layout/app-header';

const sourceSans3 = Source_Sans_3({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Houston Hackers',
  description: 'Forum for tech community in Houston',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={sourceSans3.className}>
        <AppHeader />

        <main className="h-full p-8">
          <div className="mx-auto grid max-w-screen-lg place-items-center">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
