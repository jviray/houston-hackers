import { FaGoogle } from 'react-icons/fa';

import { Btn } from '@/components/btn';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';

export const AuthButtonGroup = () => {
  return (
    <>
      <Btn variant="outline" className="font-semibold">
        LOG IN
      </Btn>

      <Dialog>
        <DialogTrigger asChild>
          <Btn className="font-semibold">SIGN UP</Btn>
        </DialogTrigger>

        <DialogContent className="w-[448px]">
          <DialogHeader>
            <h2 className="text-xl font-bold text-white">
              Welcome to Houston Hackers!
            </h2>
          </DialogHeader>

          <Btn
            size="lg"
            className="flex items-center justify-center gap-4 text-base font-semibold"
          >
            <FaGoogle className="h-5 w-5" />
            Continue with Google
          </Btn>
        </DialogContent>
      </Dialog>
    </>
  );
};
