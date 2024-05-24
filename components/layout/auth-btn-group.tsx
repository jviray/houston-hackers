import { Btn } from '@/components/btn';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
