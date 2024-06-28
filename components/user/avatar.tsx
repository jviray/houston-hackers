import { Group, Post, User } from '@prisma/client';
import Link from 'next/link';
import { default as BoringAvatar } from 'boring-avatars';

import {
  Avatar as ShadcnAvatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';

type AvatarAccount = Pick<Group, 'id' | 'image'> & {
  name: string | null;
  username?: string | null;
};

type AvatarProps<T> = {
  className?: string;
  asLink?: boolean;
  data: Partial<T>;
};

const BoringAvatarVariants = {
  user: 'beam',
  group: 'bauhaus',
} as const; // Explained: https://stackoverflow.com/questions/72340281/ts2322-type-string-is-not-assignable-to-type-union-of-strings

const Avatar =
  <T extends AvatarAccount>(type: 'user' | 'group') =>
  (props: AvatarProps<T>) => {
    const { className, asLink = false, data } = props;

    const component = (
      <ShadcnAvatar className={className}>
        <AvatarImage src={data.image as string | undefined} />

        <Skeleton className="h-full w-full rounded-full" />

        <AvatarFallback delayMs={1000}>
          <BoringAvatar
            size={100}
            name={data.id}
            variant={BoringAvatarVariants[type]}
            colors={['#fb7968', '#f9c593', '#fafad4', '#b0d1b2', '#89b2a2']}
          />
        </AvatarFallback>
      </ShadcnAvatar>
    );

    return asLink ? (
      <Link href={`/${type === 'user' ? data.username : data.name}`}>
        {component}
      </Link>
    ) : (
      component
    );
  };

export const UserAvatar = Avatar<User>('user');
export const GroupAvatar = Avatar<Group>('group');
