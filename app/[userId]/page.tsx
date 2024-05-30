import Link from 'next/link';

import { cn } from '@/lib/utils';
import { Btn } from '@/components/btn';
import { getUserByUsername } from '@/server/queries/users';
import { Avatar } from '@/components/user/avatar';

const TABS = ['Comments', 'Posts'];

export default async function UserPage({
  params,
}: {
  params: { userId: string };
}) {
  const { userId } = params;

  const user = await getUserByUsername(userId);

  if (!user) return;

  return (
    <div className="w-9/12">
      {/* Banner */}
      <div>
        <header className="flex items-center gap-8 rounded-t-[3px] bg-border p-11">
          <Avatar
            className="h-28 w-28 border-8 border-background"
            image={user.image as string | undefined}
            email={user.email}
          />

          <div>
            <h1 className="text-[36px] font-semibold leading-relaxed text-white">
              {user.name}
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
            <Btn size={'lg'} className="text-base font-semibold">
              LOG IN
            </Btn>
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
