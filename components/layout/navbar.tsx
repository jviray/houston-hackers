import { getCurrentUser } from '@/server/queries/users';

import { AuthButtonGroup } from '@/components/layout/auth-btn-group';
import { Avatar } from '@/components/user/avatar';
import Link from 'next/link';

export const Navbar = async () => {
  const user = await getCurrentUser();
  const isLoggedIn = !!user;

  return (
    <header className="bg-border px-6">
      <div className="mx-auto flex max-w-screen-lg items-center justify-between py-3">
        <h1 className="text-lg font-bold text-white">
          <Link href="/">HOUSTON HACKERS</Link>
        </h1>

        <div className="space-x-3">
          {isLoggedIn ? (
            <Avatar
              asLink
              className="outline-3 outline-white hover:outline"
              user={user}
            />
          ) : (
            <AuthButtonGroup />
          )}
        </div>
      </div>
    </header>
  );
};
