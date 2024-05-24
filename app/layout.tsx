import type { Metadata } from 'next';
import { Source_Sans_3 } from 'next/font/google';

import '@/styles/globals.css';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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
        <header className="bg-border px-6">
          <div className="mx-auto flex max-w-screen-lg items-center justify-between py-3">
            <h1 className="font-bold text-white">HOUSTON HACKERS</h1>
            <Avatar className="outline-3 outline-white hover:outline">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="h-full p-8">
          <div className="mx-auto grid max-w-screen-lg place-items-center">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
