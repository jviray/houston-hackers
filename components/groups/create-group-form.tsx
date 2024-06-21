'use client';

import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ImageUp } from 'lucide-react';

import { GroupSchema } from '@/lib/schemas';
import { getSignedUrl } from '@/server/actions/upload';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Btn } from '@/components/btn';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
// import { AutosizeTextarea } from '@/components/ui/autosize-textarea';
import { Textarea } from '@/components/ui/textarea';

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
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-3 space-y-8"
          >
            <div className="space-y-6">
              <div className="flex space-x-6">
                <Avatar
                  onClick={() =>
                    document.getElementById('image-input')!.click()
                  }
                  className="group relative grid h-24 w-24 cursor-pointer place-items-center border-[6px] text-center text-xs"
                >
                  <AvatarImage src={fileUrl} />
                  <AvatarFallback className="bg-[#182e43]">
                    Add image
                  </AvatarFallback>

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

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Group Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. E-Commerce, Bootstrapping, etc."
                          className="appearance-none rounded-[3px] border-none bg-border text-base text-[#dde1e4]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        maxLength={280}
                        placeholder="What's this group about?"
                        className="h-40 w-full resize-none appearance-none rounded-[3px] border-none bg-border text-base text-[#dde1e4]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end">
              <Btn type="submit">SUBMIT GROUP</Btn>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
