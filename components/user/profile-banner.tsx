import { User } from '@prisma/client';

import { cn } from '@/lib/utils';

import { Btn } from '@/components/btn';
import { Avatar } from '@/components/user/avatar';

const TABS = ['Comments', 'Posts'];

type Props = {
  user: User;
};

export const ProfileBanner = ({ user }: Props) => {
  return (
    <>
      <header className="flex items-center gap-8 rounded-t-[3px] bg-border p-11">
        <Avatar className="h-28 w-28 border-8 border-background" user={user} />

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
    </>
  );
};
