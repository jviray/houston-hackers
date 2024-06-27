import Link from 'next/link';

import { db } from '@/server/db';

import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { LoginRequired } from '@/components/access/login-required';
import { CreateGroupForm } from '@/components/groups/create-group-form';
import { capitalize } from '@/lib/utils';
import { fetchAllGroups } from '@/server/queries';

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

export const GroupAside = async () => {
  const groups = await fetchAllGroups();

  return (
    <Card className="col-span-2 space-y-3 self-start rounded-[3px] border-[3px] p-2">
      <div className="bg-[#182e43] p-3">
        <h2 className="font-semibold">Groups</h2>
      </div>

      <ul className="space-y-1">
        {groups.map((group) => (
          <Link
            key={group.name}
            href="/"
            className="flex items-center space-x-3 rounded-[3px] p-2 hover:bg-border"
          >
            {/* <Avatar className="h-9 w-9 border-[3px] border-background">
              <AvatarImage src={group.image as string | undefined} />
            </Avatar> */}

            <h3 className="text-white">{capitalize(group.name)}</h3>
          </Link>
        ))}
      </ul>

      <LoginRequired>
        <CreateGroupForm />
      </LoginRequired>
    </Card>
  );
};
