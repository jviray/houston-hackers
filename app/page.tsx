import { cn } from '@/lib/utils';

import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronUp } from 'lucide-react';
import Link from 'next/link';
import { Btn } from '@/components/btn';
import { LoginRequired } from '@/components/access/login-required';

const TABS = ['Top', 'Newest', 'Groups'];

const GROUPS = [
  {
    name: 'Ideas and Validation',
    img: 'https://storage.googleapis.com/indie-hackers.appspot.com/group-icons/ideas-and-validation/180x180_ideas-and-validation.webp?ts=1574200397562',
  },
  {
    name: 'Looking to Partner Up',
    img: 'https://storage.googleapis.com/indie-hackers.appspot.com/group-icons/looking-to-partner-up/180x180_looking-to-partner-up.webp?ts=1564959467450',
  },
  {
    name: 'Developers',
    img: 'https://storage.googleapis.com/indie-hackers.appspot.com/group-icons/developers/180x180_developers.webp?ts=1592158591793',
  },
  {
    name: 'Product Launch',
    img: 'https://storage.googleapis.com/indie-hackers.appspot.com/group-icons/product-launch/180x180_product-launch.webp?ts=1594327612304',
  },
  {
    name: 'Artificial Intelligence',
    img: 'https://storage.googleapis.com/indie-hackers.appspot.com/group-icons/artificial-intelligence/180x180_artificial-intelligence.webp?ts=1656104920091',
  },
];

export default function Home() {
  return (
    <div className="grid w-full grid-cols-7 gap-8">
      {/* Main Feed */}
      <Card className="col-span-5 h-[500px] rounded-[3px] border-[3px]">
        {/* Card Header */}
        <div>
          {/* Tabs */}
          <ul className="flex gap-2 border-b-[3px]">
            {TABS.map((tabLabel, idx) => (
              <li
                key={tabLabel}
                className={cn(
                  'relative top-[3px] border-b-[3px] border-b-transparent p-4',
                  idx === 0
                    ? 'border-b-[#4799eb] text-white'
                    : 'hover:border-b-[#385c80]',
                )}
              >
                <h2 className="font-semibold">{tabLabel}</h2>
              </li>
            ))}
          </ul>
        </div>

        {/* Card Content */}
        <div>
          {/* Feed */}
          <ul className="py-4">
            {/* List Item */}
            <li className="relative flex items-start gap-6 px-8 py-3">
              <Avatar className="outline-3 absolute -left-[19px] h-9 w-9 border-[3px] outline-white hover:outline">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <div className="flex flex-col items-center">
                <ChevronUp className="h-5 w-5" />
                <span className="text-sm font-semibold leading-none">10</span>
              </div>

              <div>
                <h3 className="text-lg font-[500px] leading-5 text-white">
                  First post on Houston Hackers
                </h3>

                {/* Meta */}
                <div>
                  <p className="text-[15px] text-[#63809C]">
                    <span className="text-foreground">jviray</span> posted in{' '}
                    <span>AI</span> &middot; <span>7 hours ago</span> &middot;{' '}
                    <span>10 comments</span>
                  </p>
                </div>
              </div>
            </li>
            <li className="relative flex items-start gap-6 px-8 py-4">
              <Avatar className="outline-3 absolute -left-[19px] h-9 w-9 border-[3px] outline-white hover:outline">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <div className="flex flex-col items-center">
                <ChevronUp className="h-5 w-5" />
                <span className="text-sm font-semibold leading-none">10</span>
              </div>

              <div>
                <h3 className="text-lg font-[500px] leading-5 text-white">
                  Second post on Houston Hackers
                </h3>

                {/* Meta */}
                <div>
                  <p className="text-[15px] text-[#63809C]">
                    <span className="text-foreground">jviray</span> posted in{' '}
                    <span>AI</span> &middot; <span>2 hours ago</span> &middot;{' '}
                    <span>10 comments</span>
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </Card>

      {/* Groups */}
      <Card className="col-span-2 space-y-3 self-start rounded-[3px] border-[3px] p-2">
        <div className="bg-[#182e43] p-3">
          <h2 className="font-semibold">Groups</h2>
        </div>

        <ul className="space-y-1">
          {GROUPS.map((group) => (
            <Link
              key={group.name}
              href="/"
              className="flex items-center space-x-3 rounded-[3px] p-2 hover:bg-border"
            >
              <Avatar className="h-9 w-9 border-[3px] border-background">
                <AvatarImage src={group.img} />
              </Avatar>

              <h3 className="text-white">{group.name}</h3>
            </Link>
          ))}
        </ul>

        <LoginRequired>
          <Btn className="w-full font-semibold">CREATE GROUP</Btn>
        </LoginRequired>
      </Card>
    </div>
  );
}
