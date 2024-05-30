import { getCurrentUser } from '@/server/queries/users';

import { AuthButtonGroup } from '@/components/layout/auth-btn-group';
import { Avatar } from '@/components/user/avatar';

export const Navbar = async () => {
  const user = await getCurrentUser();

  return (
    <header className="bg-border px-6">
      <div className="mx-auto flex max-w-screen-lg items-center justify-between py-3">
        <h1 className="font-bold text-white">HOUSTON HACKERS</h1>

        <div className="space-x-3">
          {user ? (
            <Avatar
              className="outline-3 outline-white hover:outline"
              image={user.image}
              email={user.email}
            />
          ) : (
            <AuthButtonGroup />
          )}
        </div>
      </div>
    </header>
  );
};
