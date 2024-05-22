import { cn } from '@/lib/utils';

import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronUp } from 'lucide-react';

const TABS = ['Top', 'Newest', 'Groups'];

export default function Home() {
  return (
    // List Card
    <Card className="h-[500px] w-[600px] rounded-[3px] border-[3px]">
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
  );
}
