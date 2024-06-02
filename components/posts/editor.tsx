'use client';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';

const theme = {};

const onError = (error: Error) => {
  console.error(error);
};

export default function Editor() {
  const initialConfig = {
    namespace: 'TextEditor',
    theme,
    onError,
  };

  return (
    <div className="w-8/12">
      <LexicalComposer initialConfig={initialConfig}>
        <div className="flex min-h-44 w-full flex-col rounded-md border-2 bg-border p-4 text-xl text-[#dde1e4]">
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
      </LexicalComposer>
    </div>
  );
}
