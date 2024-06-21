'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { GroupSchema } from '@/lib/schemas';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Btn } from '@/components/btn';

/**
 * TO DO:
 * - Name
 * - Image / Random Avatar
 * - Description
 */

export type FormFields = z.infer<typeof GroupSchema>;

export const CreateGroupForm = () => {
  const form = useForm<FormFields>({
    resolver: zodResolver(GroupSchema),
    defaultValues: {
      name: '',
      image: '',
      description: '',
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Btn className="w-full font-semibold">CREATE GROUP</Btn>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <h2 className="text-xl font-bold text-white">Create a new group</h2>
        </DialogHeader>

        {/* Form */}
      </DialogContent>
    </Dialog>
  );
};
