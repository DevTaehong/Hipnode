"use client";

import { useEffect } from "react";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { EditorState } from "lexical";

interface Props {}

const theme = {};

function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.focus();
  }, [editor]);

  return null;
}

function onError(error: Error): void {
  console.error(error);
}

function MyOnChangePlugin(props: {
  onChange: (editorState: EditorState) => void;
}): null {
  const [editor] = useLexicalComposerContext();
  const { onChange } = props;
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      onChange(editorState);
    });
  }, [editor, onChange]);
  return null;
}

export default function Editor() {
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError,
  };

  //   const [editorState, setEditorState] = useState();
  //   function onChange(editorState) {
  //     const editorStateJSON = editorState.toJSON();

  //     setEditorState(JSON.stringify(editorStateJSON));
  //   }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <PlainTextPlugin
        contentEditable={
          <ContentEditable className="h-[20rem] w-[40rem] border border-dark-2 p-4 text-[1rem] text-light-2 dark:bg-slate-800" />
        }
        placeholder={
          <div className="fixed p-4 text-[1rem] text-white">
            Enter some text...
          </div>
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <MyOnChangePlugin
        onChange={(editorState) => {
          console.log(editorState);
        }}
      />
      <MyCustomAutoFocusPlugin />
    </LexicalComposer>
  );
}
