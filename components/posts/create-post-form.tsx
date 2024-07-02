'use client';

import { useState } from 'react';
import { type EditorState } from 'lexical';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Group } from '@prisma/client';
import { ChevronDown } from 'lucide-react';

import { CreatePostFormSchema } from '@/lib/schemas';

import { AutosizeTextarea } from '@/components/ui/autosize-textarea';
import { Btn } from '@/components/btn';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import TextEditor from '@/components/editor/text-editor';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { capitalize } from '@/lib/utils';
import { GroupAvatar } from '@/components/user/avatar';

export type FormFields = z.infer<typeof CreatePostFormSchema>;

type CreatePostFormProps = {
  groups: Group[];
};

export const CreatePostForm = ({ groups }: CreatePostFormProps) => {
  const [open, setOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState('');

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
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                aria-expanded={open}
                className="flex items-center gap-3 rounded-sm bg-border text-base font-normal text-foreground hover:bg-[#3b5772] hover:text-white"
              >
                {selectedGroup ? capitalize(selectedGroup) : 'Select Group'}
                <ChevronDown className="h-4 w-4" strokeWidth={3} />
              </Button>
            </PopoverTrigger>

            <PopoverContent
              align="start"
              className="w-80 rounded-sm border-none bg-border p-0 shadow-2xl"
            >
              <Command className="rounded-sm bg-border text-foreground">
                <CommandInput
                  placeholder="Search groups..."
                  className="text-lg text-white"
                />
                <CommandList className="bg-border">
                  <CommandEmpty className="border-t-[3px] border-background py-6 text-center text-lg text-muted-foreground">
                    No groups found
                  </CommandEmpty>
                  <CommandGroup className="border-t-[3px] border-background p-0">
                    {groups.map((group) => (
                      <CommandItem
                        key={group.id}
                        value={group.name}
                        onSelect={(value) => {
                          setSelectedGroup(
                            value === selectedGroup ? '' : value,
                          );
                          setOpen(false);
                        }}
                        className="flex items-center gap-3 rounded-none px-4 py-2 data-[selected=true]:bg-[#3b5772] data-[selected=true]:text-white"
                      >
                        <GroupAvatar
                          data={group}
                          className="h-9 w-9 border-[3px] border-background"
                        />
                        <p className="text-lg">{capitalize(group.name)}</p>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
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
