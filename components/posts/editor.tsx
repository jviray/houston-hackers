'use client';

import { useState } from 'react';
import { type EditorState } from 'lexical';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';

import { AutosizeTextarea } from '@/components/ui/autosize-textarea';
import { Btn } from '@/components/btn';

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

  // https://lexical.dev/docs/getting-started/react#saving-lexical-state
  // https://stackoverflow.com/questions/75292778/how-do-i-parse-the-html-from-the-lexical-editorstate-without-an-extra-lexical-ed
  const [, setEditorState] = useState<string | undefined>();

  const onChange = (editorState: EditorState) => {
    // Call toJSON on the EditorState object, which produces a serialization safe string
    const editorStateJSON = editorState.toJSON();

    // However, we still have a JavaScript object, so we need to convert it to an actual string with JSON.stringify
    setEditorState(JSON.stringify(editorStateJSON));
  };

  return (
    <div className="w-8/12 space-y-8">
      <div className="space-y-4">
        <AutosizeTextarea
          maxLength={128}
          placeholder="Enter title"
          className="h-[74px] w-full resize-none appearance-none rounded-md border-none bg-border p-4 text-4xl font-semibold text-[#dde1e4] placeholder:text-[#63809C]"
        />

        <LexicalComposer initialConfig={initialConfig}>
          <div className="flex min-h-44 w-full flex-col rounded-md bg-border p-4 text-xl text-[#dde1e4]">
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

      <Btn className="px-4 py-6">SUBMIT POST</Btn>
    </div>
  );
}
