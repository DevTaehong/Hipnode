"use client";

import React, { useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ClearEditorPlugin } from "@lexical/react/LexicalClearEditorPlugin";
import { EditorState } from "lexical";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { TRANSFORMERS } from "@lexical/markdown";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { LinkNode } from "@lexical/link";
import { CodeNode } from "@lexical/code";

import { LexicalMenu } from "./LexicalMenu";
import { $generateHtmlFromNodes } from "@lexical/html";

import {
  LexicalEditorProps,
  CustomAutoFocusPluginProps,
  CustomOnChangePluginProps,
} from "";

const EDITOR_NAMESPACE = "lexical-editor";

const EDITOR_NODES = [
  CodeNode,
  HeadingNode,
  LinkNode,
  ListNode,
  ListItemNode,
  QuoteNode,
];

const theme = {
  text: {
    bold: "textBold",
    italic: "textItalic",
    underline: "textUnderline",
    strikethrough: "textStrikethrough",
  },
  list: {
    nested: {
      listitem: "editorListitem",
    },
    ol: "editorListOl",
    ul: "editorListUl",
    listitem: "editorListItem",
  },
};

const initialConfig = {
  namespace: EDITOR_NAMESPACE,
  theme,
  onError,
  nodes: EDITOR_NODES,
};

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

function onError(error: Error): void {
  console.error(error);
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

const Placeholder = () => {
  return (
    <div className="absolute bottom-[18rem] left-[1.7rem] text-[1rem]  text-sc-3">
      Tell your story...
    </div>
  );
};

function MainLexicalEditor({
  name,
  updateField,
  imagePreviewUrl,
  onSubmitPreview,
  previewValues,
}: LexicalEditorProps) {
  const [editor] = useLexicalComposerContext();
  const [htmlString, setHtmlString] = useState("");
  const [autoFocus, setAutoFocus] = useState(false);
  const editorRef = React.useRef<HTMLDivElement>(null);
  const [editorState, setEditorState] = useState<EditorState | undefined>(
    undefined
  );

  console.log(editorState);

  useEffect(() => {
    return editor?.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const htmlStringEditor = $generateHtmlFromNodes(editor, null);
        console.log(htmlStringEditor);
        setHtmlString(htmlStringEditor);
      });
    });
  }, [editor]);

  function onChange(editorState: EditorState) {
    setEditorState(editorState);
  }

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
          imagePreviewUrl={imagePreviewUrl}
          onSubmitPreview={onSubmitPreview}
          previewValues={previewValues}
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
}

export default function LexicalEditor({
  name,
  updateField,
  imagePreviewUrl,
  onSubmitPreview,
  previewValues,
}: LexicalEditorProps) {
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <MainLexicalEditor
        name={name}
        updateField={updateField}
        imagePreviewUrl={imagePreviewUrl}
        onSubmitPreview={onSubmitPreview}
        previewValues={previewValues}
      />
    </LexicalComposer>
  );
}

// https://courses.jsmastery.pro/course/ultimate-next-js-13-course-ebook/learn/module-ask-a-question-page/custom-multiple-tags-input
