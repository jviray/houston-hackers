import { getCurrentUser } from '@/server/queries/users';

type Props = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

export const LoginRequired = async (props: Props) => {
  const user = await getCurrentUser();
  const isLoggedIn = !!user;

  return isLoggedIn ? <>{props.children}</> : <>{props.fallback}</>;
};
