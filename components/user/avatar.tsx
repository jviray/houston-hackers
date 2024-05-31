import { User } from '@prisma/client';
import Link from 'next/link';
import { default as BoringAvatar } from 'boring-avatars';

import {
  Avatar as ShadcnAvatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';

type AvatarProps = {
  className?: string;
  asLink?: boolean;
  user: Partial<User>;
};

export const Avatar = (props: AvatarProps) => {
  const { className, asLink = false, user } = props;

  const component = (
    <ShadcnAvatar className={className}>
      <AvatarImage src={user.image as string | undefined} />

      <Skeleton className="h-full w-full rounded-full" />

      <AvatarFallback delayMs={1000}>
        <BoringAvatar
          size={100}
          name={user.email}
          variant="beam"
          colors={['#fb7968', '#f9c593', '#fafad4', '#b0d1b2', '#89b2a2']}
        />
      </AvatarFallback>
    </ShadcnAvatar>
  );

  return asLink ? (
    <Link href={`/${user.username}`}>{component}</Link>
  ) : (
    component
  );
};
