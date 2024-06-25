import { getCurrentUser } from '@/lib/utils';

type Props = {
  permission: string;
  children: React.ReactNode;
};

export const PermissionRequired = async (props: Props) => {
  const { permission, children } = props;

  const permissionType = permission.split(':')[0];

  const user = await getCurrentUser();

  if (
    permissionType === 'owner' &&
    // Take authorized owner from permission. Note: Should still deny access via middleware.
    user?.username !== permission.split(':')[1]
  ) {
    return null;
  }

  return <>{children}</>;
};
