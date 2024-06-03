'use client';

import { type EditorState } from 'lexical';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';

import { ToolbarPlugin } from '@/components/editor/toolbar-plugin';

const theme = {};

const onError = (error: Error) => {
  console.error(error);
};

export default function TextEditor({
  onChange,
}: {
  onChange: (editorState: EditorState) => void;
}) {
  const initialConfig = {
    namespace: 'TextEditor',
    theme,
    onError,
  };

  return (
    <div>
      <LexicalComposer initialConfig={initialConfig}>
        <ToolbarPlugin />

        <div className="flex min-h-44 w-full flex-col rounded-b-[3px] bg-border p-4 text-xl text-[#dde1e4]">
          <div className="relative flex flex-grow flex-col">
            <RichTextPlugin
              contentEditable={
                <ContentEditable className="relative z-10 h-full w-full flex-grow focus:outline-none" />
              }
              placeholder={
                <p className="absolute top-0 text-[#63809C]">Enter body...</p>
              }
              ErrorBoundary={LexicalErrorBoundary}
            />
          </div>
        </div>
        <AutoFocusPlugin />
        <HistoryPlugin />
        <OnChangePlugin onChange={onChange} />
      </LexicalComposer>
    </div>
  );
}
