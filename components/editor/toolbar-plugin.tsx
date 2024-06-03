import { BoldIcon, ItalicIcon, UnderlineIcon } from 'lucide-react';

import { Toggle } from '@/components/ui/toggle';

export const ToolbarPlugin = () => {
  return (
    <div className="flex items-center justify-end gap-1 rounded-t-[3px] border-b-[3px] border-background bg-[#182e43] p-1">
      <Toggle
        aria-label="Toggle bold"
        size="sm"
        className="rounded-[3px] hover:bg-[#354a5e] hover:text-foreground data-[state=on]:bg-[#354a5e] data-[state=on]:text-white"
        onPressedChange={(pressed) => {
          console.log(pressed);
        }}
      >
        <BoldIcon className="h-4 w-4" />
      </Toggle>

      <Toggle
        aria-label="Toggle italic"
        size="sm"
        className="rounded-[3px] hover:bg-[#354a5e] hover:text-foreground data-[state=on]:bg-[#354a5e] data-[state=on]:text-white"
      >
        <ItalicIcon className="h-4 w-4" />
      </Toggle>

      <Toggle
        aria-label="Toggle underline"
        size="sm"
        className="rounded-[3px] hover:bg-[#354a5e] hover:text-foreground data-[state=on]:bg-[#354a5e] data-[state=on]:text-white"
      >
        <UnderlineIcon className="h-4 w-4" />
      </Toggle>
    </div>
  );
};
