'use client';

import { Btn } from '@/components/btn';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';

/**
 * TO DO:
 * - Image / Random Avatar
 * - Name
 * - Image
 * - Description
 */

export const CreateGroup = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Btn className="w-full font-semibold">CREATE GROUP</Btn>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <h2 className="text-xl font-bold text-white">Create a new group</h2>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
