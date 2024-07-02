import Link from 'next/link';

import { getCurrentUser } from '@/lib/utils';

import { LoginRequired } from '@/components/access/login-required';
import { UserAvatar } from '@/components/avatar';
import { AuthButtonGroup } from '@/components/layout/auth-btn-group';

export const Navbar = async () => {
  const user = await getCurrentUser();

  return (
    <header className="bg-border px-6">
      <div className="mx-auto flex max-w-screen-lg items-center justify-between py-3">
        <h1 className="text-lg font-bold text-white">
          <Link href="/">HOUSTON HACKERS</Link>
        </h1>

        <div className="space-x-3">
          <LoginRequired fallback={<AuthButtonGroup />}>
            <UserAvatar
              asLink
              className="outline-3 outline-white hover:outline"
              data={user!}
            />
          </LoginRequired>
        </div>
      </div>
    </header>
  );
};
