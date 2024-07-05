'use client';

import { useState, useTransition } from 'react';
import { type EditorState } from 'lexical';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Group } from '@prisma/client';

import { CreatePostFormSchema } from '@/lib/schemas';
import { submitNewPost } from '@/server/actions';

import { AutosizeTextarea } from '@/components/ui/autosize-textarea';
import { Btn } from '@/components/btn';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import TextEditor from '@/components/editor/text-editor';
import { GroupSelect } from '@/components/search-select';

// https://lexical.dev/docs/getting-started/react#saving-lexical-state
// https://www.chunxuyang.com/blogs/shadcn-lexical-editor/
// https://stackoverflow.com/questions/75292778/how-do-i-parse-the-html-from-the-lexical-editorstate-without-an-extra-lexical-ed
// https://github.com/colinhacks/zod/discussions/2215

export type FormFields = z.infer<typeof CreatePostFormSchema>;

type CreatePostFormProps = {
  groups: Group[];
};

export const CreatePostForm = ({ groups }: CreatePostFormProps) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const form = useForm<FormFields>({
    resolver: zodResolver(CreatePostFormSchema),
    defaultValues: {
      title: '',
      group: '',
      content: '',
    },
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    startTransition(async () => {
      const res = await submitNewPost(data);
      console.log(res);
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <AutosizeTextarea
                    maxLength={128}
                    placeholder="Enter title"
                    className="h-[74px] w-full resize-none appearance-none rounded-[3px] border-none bg-border p-4 text-4xl font-semibold text-[#dde1e4] placeholder:text-[#63809C]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="group"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <GroupSelect
                    open={isSelectOpen}
                    setOpen={setIsSelectOpen}
                    value={field.value}
                    setValue={(value) => {
                      field.onChange(value);
                    }}
                    data={groups}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <TextEditor
                    onChange={(editorState: EditorState) => {
                      // Call toJSON on EditorState to get JS object
                      const editorStateJSON = editorState.toJSON();

                      // Convert it to an actual string with JSON.stringify
                      field.onChange(JSON.stringify(editorStateJSON));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Btn type="submit" className="px-4 py-6">
          SUBMIT POST
        </Btn>
      </form>
    </Form>
  );
};
