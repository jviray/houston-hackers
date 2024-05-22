import type { Metadata } from 'next';
import { Source_Sans_3 } from 'next/font/google';

import '@/styles/globals.css';

const sourceSans3 = Source_Sans_3({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Indie Hackers Clone',
  description: 'Developed by @jviray',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={sourceSans3.className}>
        <main className="h-full p-4">{children}</main>
      </body>
    </html>
  );
}
