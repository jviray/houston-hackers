'use client';

import { useEffect, useState } from 'react';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ImageUp } from 'lucide-react';

import { CreateGroupFormSchema } from '@/lib/schemas';
import { getImageSignedUrl } from '@/server/actions/upload';

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
import { Textarea } from '@/components/ui/textarea';

const computeSHA256 = async (file: File) => {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return hashHex;
};

export type FormFields = z.infer<typeof CreateGroupFormSchema>;

/**
 * TODO:
 * - Allow removing photo
 */

export const CreateGroupForm = () => {
  const [fileUrl, setFileUrl] = useState<string | undefined>();

  const form = useForm<FormFields>({
    resolver: zodResolver(CreateGroupFormSchema),
    defaultValues: {
      name: '',
      imageFile: new File([], ''),
      description: '',
    },
  });

  const imageFile = useWatch({ control: form.control, name: 'imageFile' });

  useEffect(() => {
    if (imageFile?.name && imageFile.size) {
      console.log('1');
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
      }

      const url = URL.createObjectURL(imageFile);
      setFileUrl(url);
    }
  }, [imageFile]);

  const onSubmit: SubmitHandler<FormFields> = async (fields) => {
    console.log(fields);
    // try {
    //   if (file) {
    //     const checksum = await computeSHA256(file);
    //     const signedUrl = await getImageSignedUrl(
    //       file.type,
    //       file.size,
    //       checksum,
    //     );

    //     if (signedUrl.error !== undefined) {
    //       throw new Error(signedUrl.error);
    //     }

    //     const url = signedUrl.success?.url;

    //     await fetch(url, {
    //       method: 'PUT',
    //       body: file,
    //       headers: {
    //         'Content-Type': file.type,
    //       },
    //     });
    //   }
    // } catch (error) {
    //   // Show UI message for error
    //   console.error(error);
    // }
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
                <FormField
                  control={form.control}
                  name="imageFile"
                  render={({ field }) => (
                    <FormItem>
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

                        <FormControl>
                          <Input
                            id="image-input"
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            className="hidden"
                            onChange={(e) => {
                              const selectedFile = e.target.files?.[0];
                              // Only trigger field.onChange if file actually selected
                              if (selectedFile) field.onChange(selectedFile);
                            }}
                          />
                        </FormControl>
                      </Avatar>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
