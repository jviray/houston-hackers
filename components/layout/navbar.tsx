import { auth } from '@/lib/utils';

import { AuthButtonGroup } from '@/components/layout/auth-btn-group';
import { Avatar } from '@/components/user/avatar';

export const Navbar = async () => {
  const session = await auth();

  return (
    <header className="bg-border px-6">
      <div className="mx-auto flex max-w-screen-lg items-center justify-between py-3">
        <h1 className="font-bold text-white">HOUSTON HACKERS</h1>

        <div className="space-x-3">
          {session?.user ? (
            <Avatar
              className="outline-3 outline-white hover:outline"
              image={session.user.image!}
              email={session.user.email!}
            />
          ) : (
            <AuthButtonGroup />
          )}
        </div>
      </div>
    </header>
  );
};
