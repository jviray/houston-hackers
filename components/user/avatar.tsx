import { default as BoringAvatar } from 'boring-avatars';

import {
  Avatar as ShadcnAvatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';

type AvatarProps = {
  className?: string;
  image?: string;
  email: string;
};

export const Avatar = (props: AvatarProps) => {
  const { className, image, email } = props;

  return (
    <ShadcnAvatar className={className}>
      <AvatarImage src={image} />

      <Skeleton className="h-full w-full rounded-full" />

      <AvatarFallback delayMs={1000}>
        <BoringAvatar
          size={100}
          name={email}
          variant="beam"
          colors={['#fb7968', '#f9c593', '#fafad4', '#b0d1b2', '#89b2a2']}
        />
      </AvatarFallback>
    </ShadcnAvatar>
  );
};
