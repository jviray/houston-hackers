'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ImageUp } from 'lucide-react';

import { GroupSchema } from '@/lib/schemas';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Btn } from '@/components/btn';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { ChangeEvent, useState } from 'react';
import { getSignedUrl } from '@/server/actions/upload';

/**
 * TO DO:
 * - Name
 * - Image / Random Avatar
 * - Description
 */

export type FormFields = z.infer<typeof GroupSchema>;

export const CreateGroupForm = () => {
  const [file, setFile] = useState<File | undefined>();
  const [fileUrl, setFileUrl] = useState<string | undefined>();

  const form = useForm<FormFields>({
    resolver: zodResolver(GroupSchema),
    defaultValues: {
      name: '',
      image: '',
      description: '',
    },
  });

  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFile = e.target.files?.[0];
    setFile(newFile);

    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
    }

    if (newFile) {
      const url = URL.createObjectURL(newFile);
      setFileUrl(url);
    } else {
      setFileUrl(undefined);
    }
  };

  const onSubmit = async (fields: FormFields) => {
    const signedUrl = await getSignedUrl();

    console.log(fields);
  };

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
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-3">
          <Avatar
            onClick={() => document.getElementById('image-input')!.click()}
            className="group relative grid h-24 w-24 cursor-pointer place-items-center border-[6px] text-center text-xs"
          >
            <AvatarImage src={fileUrl} />
            <AvatarFallback className="bg-[#182e43]">Add photo</AvatarFallback>

            {/* Overlay */}
            <div className="absolute bottom-0 left-0 right-0 top-0 group-hover:bg-black group-hover:opacity-40"></div>
            {/* Icon Overlay */}
            <div className="absolute hidden h-full w-full group-hover:grid group-hover:place-items-center">
              <ImageUp color="#fff" size={28} />
            </div>

            <Input
              id="image-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onImageChange}
            />
          </Avatar>
        </form>
      </DialogContent>
    </Dialog>
  );
};
