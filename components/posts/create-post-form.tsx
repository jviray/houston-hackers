'use client';

import { useState } from 'react';
import { type EditorState } from 'lexical';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { CreatePostFormSchema } from '@/lib/schemas';

import { AutosizeTextarea } from '@/components/ui/autosize-textarea';
import { Btn } from '@/components/btn';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import TextEditor from '@/components/editor/text-editor';
import { Button } from '../ui/button';
import { ChevronDown } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export type FormFields = z.infer<typeof CreatePostFormSchema>;

export const CreatePostForm = () => {
  const form = useForm<FormFields>({
    resolver: zodResolver(CreatePostFormSchema),
    defaultValues: {
      title: '',
    },
  });

  // https://lexical.dev/docs/getting-started/react#saving-lexical-state
  // https://www.chunxuyang.com/blogs/shadcn-lexical-editor/
  // https://stackoverflow.com/questions/75292778/how-do-i-parse-the-html-from-the-lexical-editorstate-without-an-extra-lexical-ed

  const [body, setBody] = useState<string | undefined>();

  const onEditorChange = (editorState: EditorState) => {
    // Call toJSON on the EditorState object, which produces a serialization safe string
    const editorStateJSON = editorState.toJSON();

    // However, we still have a JavaScript object, so we need to convert it to an actual string with JSON.stringify
    setBody(JSON.stringify(editorStateJSON));
  };

  const onSubmit = (fields: FormFields) => {
    console.log(fields);
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
              </FormItem>
            )}
          />

          {/* Select Group */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                className="flex items-center gap-3 rounded-sm bg-border text-base font-normal text-foreground hover:bg-[#3b5772] hover:text-white"
              >
                <span>Select Group</span>
                <ChevronDown className="h-4 w-4" strokeWidth={3} />
              </Button>
            </PopoverTrigger>

            <PopoverContent
              align="start"
              className="border-bg h-40 w-80 rounded-sm border-[3px] bg-border p-3 text-foreground shadow-xl"
            >
              add group list here
            </PopoverContent>
          </Popover>

          <TextEditor onChange={onEditorChange} />
        </div>

        <Btn type="submit" className="px-4 py-6">
          SUBMIT POST
        </Btn>
      </form>
    </Form>
  );
};
