import { cn } from '@/lib/utils';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const TABS = ['Comments', 'Posts'];

export default function UserPage() {
  return (
    <div className="w-[800px]">
      {/* Banner */}
      <div>
        <header className="flex items-center gap-8 rounded-t-[3px] bg-border p-11">
          <Avatar className="h-28 w-28 border-8 border-background">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div>
            <h1 className="text-[36px] font-semibold leading-relaxed text-white">
              Jonathan Viray
            </h1>
            <p className="text-lg leading-snug">
              Lorem ipsum dolor sit amet consectetur adipisicing elit
            </p>
          </div>
        </header>

        <nav className="flex items-center justify-between rounded-b-[3px] border-t-[3px] border-background bg-[#182e43]">
          {/* Tabs */}
          <ul className="flex gap-2">
            {TABS.map((tabLabel, idx) => (
              <li
                key={tabLabel}
                className={cn(
                  'border-b-[3px] border-b-transparent p-4',
                  idx === 0
                    ? 'border-b-[#4799eb] text-white'
                    : 'hover:border-b-[#385c80]',
                )}
              >
                <h2 className="font-semibold">{tabLabel}</h2>
              </li>
            ))}
          </ul>

          <div className="px-2">
            <Button
              size={'lg'}
              className="bg-gradient-to-r from-[#e052a0] to-[#f15c41] text-base font-semibold  hover:from-[#3ec7e0] hover:to-[#526bf4]"
            >
              Follow
            </Button>
          </div>
        </nav>
      </div>

      {/* Feed */}
      <div className="py-10">
        <ul className="space-y-12">
          <li className="space-y-4">
            <div className="space-x-2 text-[15px]">
              <span className="font-semibold text-ring">MAY 22 2024</span>
              <Link href={'/'} className="hover:underline">
                replied to a post
              </Link>
            </div>

            <div className="rounded-[3px] bg-border p-4 text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
              voluptas amet officia earum nesciunt repudiandae nisi magni dicta
              deserunt ipsam!
            </div>
          </li>

          <li className="space-y-4">
            <div className="space-x-2 text-[15px]">
              <span className="font-semibold text-ring">MAY 22 2024</span>
              <Link href={'/'} className="hover:underline">
                replied to a post
              </Link>
            </div>

            <div className="rounded-[3px] bg-border p-4 text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatibus, laborum voluptatum! Debitis, vitae vero! Soluta
              inventore ea praesentium culpa sunt reprehenderit corporis debitis
              saepe consequatur. Reprehenderit animi libero aperiam at.
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
