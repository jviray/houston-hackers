'use client';

import { useState } from 'react';
import { type EditorState } from 'lexical';

import { AutosizeTextarea } from '@/components/ui/autosize-textarea';
import { Btn } from '@/components/btn';
import Editor from '@/components/posts/editor';

export const NewPostForm = () => {
  const [title, setTitle] = useState<string | undefined>();

  // https://lexical.dev/docs/getting-started/react#saving-lexical-state
  // https://stackoverflow.com/questions/75292778/how-do-i-parse-the-html-from-the-lexical-editorstate-without-an-extra-lexical-ed

  const [body, setBody] = useState<string | undefined>();

  const onEditorChange = (editorState: EditorState) => {
    // Call toJSON on the EditorState object, which produces a serialization safe string
    const editorStateJSON = editorState.toJSON();

    // However, we still have a JavaScript object, so we need to convert it to an actual string with JSON.stringify
    setBody(JSON.stringify(editorStateJSON));
  };

  return (
    <form className="space-y-8">
      <div className="space-y-4">
        <AutosizeTextarea
          maxLength={128}
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="h-[74px] w-full resize-none appearance-none rounded-md border-none bg-border p-4 text-4xl font-semibold text-[#dde1e4] placeholder:text-[#63809C]"
        />

        <Editor onChange={onEditorChange} />
      </div>

      <Btn type="submit" className="px-4 py-6">
        SUBMIT POST
      </Btn>
    </form>
  );
};
