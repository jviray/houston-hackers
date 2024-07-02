import Link from 'next/link';

import { capitalize } from '@/lib/utils';
import { fetchAllGroups } from '@/server/queries';

import { Card } from '@/components/ui/card';
import { LoginRequired } from '@/components/access/login-required';
import { CreateGroupForm } from '@/components/groups/create-group-form';
import { GroupAvatar } from '@/components/avatar';

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
            <GroupAvatar
              data={group}
              className="h-9 w-9 border-[3px] border-background"
            />

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
