'use client';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
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
        <div className="min-h-44 w-full rounded-md border-2 bg-border p-4 text-xl text-[#dde1e4]">
          <RichTextPlugin
            contentEditable={
              <ContentEditable autoFocus className="focus:outline-none" />
            }
            placeholder={<p className="text-[#63809C]">Enter body...</p>}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <AutoFocusPlugin />
        </div>
      </LexicalComposer>
    </div>
  );
}
