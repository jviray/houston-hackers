import { useCallback, useEffect, useState } from 'react';
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import { mergeRegister } from '@lexical/utils';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { BoldIcon, ItalicIcon, UnderlineIcon } from 'lucide-react';

import { Toggle } from '@/components/ui/toggle';

export const ToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState<boolean>(false);
  const [isItalic, setIsItalic] = useState<boolean>(false);
  const [isUnderline, setIsUnderline] = useState<boolean>(false);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          $updateToolbar();
          return false;
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
    );
  }, [editor, $updateToolbar]);

  return (
    <div className="flex items-center justify-end gap-1 rounded-t-[3px] border-b-[3px] border-background bg-[#182e43] p-1">
      <Toggle
        aria-label="Toggle bold"
        size="sm"
        pressed={isBold}
        className="rounded-[3px] hover:bg-[#354a5e] hover:text-foreground data-[state=on]:bg-[#354a5e] data-[state=on]:text-white"
        onPressedChange={(pressed) => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
          setIsBold(pressed);
        }}
      >
        <BoldIcon className="h-4 w-4" />
      </Toggle>

      <Toggle
        aria-label="Toggle italic"
        size="sm"
        pressed={isItalic}
        className="rounded-[3px] hover:bg-[#354a5e] hover:text-foreground data-[state=on]:bg-[#354a5e] data-[state=on]:text-white"
        onPressedChange={(pressed) => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
          setIsItalic(pressed);
        }}
      >
        <ItalicIcon className="h-4 w-4" />
      </Toggle>

      <Toggle
        aria-label="Toggle underline"
        size="sm"
        pressed={isUnderline}
        className="rounded-[3px] hover:bg-[#354a5e] hover:text-foreground data-[state=on]:bg-[#354a5e] data-[state=on]:text-white"
        onPressedChange={(pressed) => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
          setIsUnderline(pressed);
        }}
      >
        <UnderlineIcon className="h-4 w-4" />
      </Toggle>
    </div>
  );
};
