import React, { useEffect, useState, useRef } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ClearEditorPlugin } from "@lexical/react/LexicalClearEditorPlugin";
import { EditorState } from "lexical";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { $generateHtmlFromNodes } from "@lexical/html";
import { TRANSFORMERS } from "@lexical/markdown";
import { Placeholder } from ".";
import LexicalMenu from "./LexicalMenu";
import {
  CustomAutoFocusPluginProps,
  CustomOnChangePluginProps,
  LexicalEditorProps,
} from "@/types/lexical-editor";

function CustomAutoFocusPlugin({
  autoFocus,
  setAutoFocus,
}: CustomAutoFocusPluginProps) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (autoFocus) {
      editor.focus();
    }
  }, [editor, autoFocus]);

  return null;
}

function CustomOnChangePlugin({
  onChange,
  name,
  updateField,
}: CustomOnChangePluginProps): null {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editor.update(() => {
        const htmlString = $generateHtmlFromNodes(editor, null);
        updateField(name, JSON.stringify(htmlString));
        onChange(editorState);
      });
    });
  }, [editor, onChange]);
  return null;
}

const MainLexicalEditor = ({
  name,
  updateField,
  onSubmitPreview,
}: LexicalEditorProps) => {
  const [editor] = useLexicalComposerContext();
  const [htmlString, setHtmlString] = useState("");
  const [autoFocus, setAutoFocus] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const [editorState, setEditorState] = useState<EditorState | undefined>(
    undefined
  );

  console.log(editorState);

  useEffect(() => {
    return editor?.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const htmlStringEditor = $generateHtmlFromNodes(editor, null);
        console.log(htmlStringEditor);
        updateField(name, JSON.stringify(htmlStringEditor));
        setHtmlString(htmlStringEditor);
      });
    });
  }, [editor]);

  const onChange = (editorState: EditorState) => {
    setEditorState(editorState);
  };

  return (
    <main
      ref={editorRef}
      onBlur={() => setAutoFocus(false)}
      className="flex flex-col"
    >
      <div className="w-full">
        <LexicalMenu
          editor={editor}
          editorHtmlString={htmlString}
          autoFocus={autoFocus}
          setAutoFocus={setAutoFocus}
          editorRef={editorRef}
          onSubmitPreview={onSubmitPreview}
        />
      </div>

      <RichTextPlugin
        contentEditable={
          <ContentEditable className="h-[20rem] w-[100%] overflow-scroll rounded-b-md border-x-[0.1rem] border-b-[0.1rem] border-light-2 bg-light p-6 text-[1rem] text-sc-2  dark:border-dark-4 dark:bg-dark-3 dark:text-light-2" />
        }
        placeholder={<Placeholder />}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <ListPlugin />
      <ClearEditorPlugin />
      <CustomOnChangePlugin
        name={name}
        updateField={updateField}
        onChange={onChange}
      />
      <CustomAutoFocusPlugin
        autoFocus={autoFocus}
        setAutoFocus={setAutoFocus}
      />
      <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
    </main>
  );
};

export default MainLexicalEditor;
