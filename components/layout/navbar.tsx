// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AuthButtonGroup } from '@/components/layout/auth-btn-group';

export const Navbar = () => {
  return (
    <header className="bg-border px-6">
      <div className="mx-auto flex max-w-screen-lg items-center justify-between py-3">
        <h1 className="font-bold text-white">HOUSTON HACKERS</h1>

        {/* <Avatar className="outline-3 outline-white hover:outline">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar> */}

        <div className="space-x-3">
          <AuthButtonGroup />
        </div>
      </div>
    </header>
  );
};
