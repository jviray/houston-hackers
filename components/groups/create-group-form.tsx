'use client';

import { useEffect, useState, useTransition } from 'react';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ImageUp, Loader2 } from 'lucide-react';

import { CreateGroupFormSchema } from '@/lib/schemas';
import { cn } from '@/lib/utils';
import { submitNewGroup, uploadImage } from '@/server/actions';

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
import { Button } from '@/components/ui/button';
import { FormFeedback } from '@/components/forms/form-feedback';

type FormFields = z.infer<typeof CreateGroupFormSchema>;

export const CreateGroupForm = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const [successFeedback, setSuccessFeedback] = useState<string | undefined>();

  const form = useForm<FormFields>({
    resolver: zodResolver(CreateGroupFormSchema),
    defaultValues: {
      name: '',
      imageFile: new File([], ''),
      description: '',
    },
  });

  const {
    formState: { defaultValues, isDirty, errors, submitCount, isSubmitted },
    control,
    handleSubmit,
    reset,
    setError,
    clearErrors,
  } = form;

  // Clear success feedback when closing modal
  useEffect(() => {
    if (!modalOpen) {
      setSuccessFeedback('');
    }
  }, [modalOpen]);

  const [fileUrl, setFileUrl] = useState<string | undefined>();

  const imageFile = useWatch({ control, name: 'imageFile' });

  // Sets file url for preview
  useEffect(() => {
    if (imageFile?.name && imageFile.size) {
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
      }

      const url = URL.createObjectURL(imageFile);
      setFileUrl(url);
    } else {
      setFileUrl(undefined);
    }
  }, [imageFile]);

  const [isPending, startTransition] = useTransition();

  // Clear out success feedback before executing form.handleSubmit
  useEffect(() => {
    if (isSubmitted) {
      setSuccessFeedback('');
    }
  }, [submitCount, isSubmitted]);

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    startTransition(async () => {
      const { imageFile, name, description } = data;
      try {
        let imageUrl;
        if (imageFile?.name && imageFile.size) {
          const formFile = new FormData();
          formFile.append('imageFile', imageFile);
          const res = await uploadImage(formFile);

          if (res.error) throw new Error(res.error);

          imageUrl = res.payload?.data;
        }

        const res = await submitNewGroup({
          name,
          image: imageUrl,
          description,
        });

        if (res.success) {
          setSuccessFeedback(res.success);
          reset();
        } else if (res.error) {
          throw new Error(res.error);
        }
      } catch (error) {
        if (error instanceof Error) {
          setError('root', { message: error.message });
          console.error(error);
        }
      }
    });
  };

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Btn className="w-full font-semibold">CREATE GROUP</Btn>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <h2 className="text-xl font-bold text-white">Create a new group</h2>
        </DialogHeader>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-3 space-y-8">
            <div className="space-y-6">
              <div className="flex space-x-6">
                <FormField
                  control={control}
                  name="imageFile"
                  render={({ field }) => (
                    <FormItem>
                      <Avatar
                        onClick={() => {
                          if (errors.root) clearErrors('root');
                          if (successFeedback) setSuccessFeedback('');
                          document.getElementById('image-input')!.click();
                        }}
                        className={cn(
                          'group relative grid h-24 w-24 cursor-pointer place-items-center border-[6px] text-center text-xs',
                          isPending && 'cursor-not-allowed',
                        )}
                      >
                        <AvatarImage src={fileUrl} />
                        <AvatarFallback className="bg-[#182e43]">
                          Add image
                        </AvatarFallback>

                        {/* Overlay */}
                        <div
                          className={cn(
                            'absolute bottom-0 left-0 right-0 top-0 group-hover:bg-black group-hover:opacity-40',
                            isPending && 'bg-black opacity-40',
                          )}
                        ></div>
                        {/* Icon Overlay */}
                        {!isPending && (
                          <div className="absolute hidden h-full w-full group-hover:grid group-hover:place-items-center">
                            <ImageUp color="#fff" size={28} />
                          </div>
                        )}

                        <FormControl>
                          <Input
                            disabled={isPending}
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
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Group Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          placeholder="e.g. E-Commerce, Bootstrapping, etc."
                          className="appearance-none rounded-[3px] border-none bg-border text-base text-[#dde1e4]"
                          onFocus={() => {
                            if (errors.root) clearErrors('root');
                            if (successFeedback) setSuccessFeedback('');
                          }}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isPending}
                        maxLength={280}
                        placeholder="What's this group about?"
                        className="h-40 w-full resize-none appearance-none rounded-[3px] border-none bg-border text-base text-[#dde1e4]"
                        onFocus={() => {
                          if (errors.root) clearErrors('root');
                          if (successFeedback) setSuccessFeedback('');
                        }}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Btn disabled={isPending} type="submit" className="relative">
                  <Loader2
                    className={cn(
                      'hidden',
                      isPending && 'absolute block animate-spin',
                    )}
                  />
                  <span className={cn('visible', isPending && 'invisible')}>
                    SUBMIT GROUP
                  </span>
                </Btn>

                {/* 
                isDirty not triggered when file uploaded, so
                we have to check if imageFile state has name and size.
                If so, that means it's not the `dummy` default file value
              */}
                {!successFeedback &&
                  !errors.root &&
                  !isPending &&
                  ((imageFile?.name && imageFile?.size) || isDirty) && (
                    <Button
                      type="button"
                      variant="link"
                      onClick={() => {
                        reset(defaultValues);

                        // Need to manually clear out file input.
                        // Reset won't clear it. As a result, re-uploading same file that was cancelled prior,
                        // won't trigger useEffect (bc same file is still set as the value even though preview changed)
                        const fileInput = document.getElementById(
                          'image-input',
                        ) as HTMLInputElement;
                        fileInput.value = '';
                      }}
                      className="text-foreground"
                    >
                      Cancel
                    </Button>
                  )}
              </div>

              <FormFeedback status="error" message={errors.root?.message} />
              <FormFeedback status="success" message={successFeedback} />
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
