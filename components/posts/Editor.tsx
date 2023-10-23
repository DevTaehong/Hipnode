"use client";

import { useEffect, useMemo, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ClearEditorPlugin } from "@lexical/react/LexicalClearEditorPlugin";
import {
  $getRoot,
  $isParagraphNode,
  CLEAR_EDITOR_COMMAND,
  EditorState,
} from "lexical";

import { IconAlt } from "../icons/outline-icons";

import { UseFormSetValue } from "react-hook-form";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";

import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { TRANSFORMERS } from "@lexical/markdown";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";

import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { LinkNode } from "@lexical/link";
import { CodeNode } from "@lexical/code";

const EDITOR_NAMESPACE = "lexical-editor";

const EDITOR_NODES = [
  CodeNode,
  HeadingNode,
  LinkNode,
  ListNode,
  ListItemNode,
  QuoteNode,
];

type FormValues = {
  title: string;
  mainText: string;
  coverImage?: string;
  group: string;
  post: string;
  tagStringsInput: string;
};

type LexicalEditorProps = {
  config?: Parameters<typeof LexicalComposer>["0"]["initialConfig"];
  name: keyof FormValues;
  updateField: UseFormSetValue<FormValues>;
};

const theme = {};

const initialConfig = {
  namespace: EDITOR_NAMESPACE,
  theme,
  onError,
  nodes: EDITOR_NODES,
};

type CustomOnChangePluginProps = {
  onChange: (editorState: EditorState) => void;
  name: keyof FormValues;
  updateField: UseFormSetValue<FormValues>;
};

export function ActionsPlugin() {
  const [editor] = useLexicalComposerContext();
  const [isEditorEmpty, setIsEditorEmpty] = useState(true);

  useEffect(
    function checkEditorEmptyState() {
      return editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          const root = $getRoot();
          const children = root.getChildren();

          if (children.length > 1) {
            setIsEditorEmpty(false);
            return;
          }

          if ($isParagraphNode(children[0])) {
            setIsEditorEmpty(children[0].getChildren().length === 0);
          } else {
            setIsEditorEmpty(false);
          }
        });
      });
    },
    [editor]
  );

  const MandatoryPlugins = useMemo(() => {
    return <ClearEditorPlugin />;
  }, []);

  return (
    <>
      {MandatoryPlugins}
      <div className="my-4">
        <button
          type="button"
          disabled={isEditorEmpty}
          onClick={() => {
            editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
          }}
        >
          {<IconAlt.Close />}
        </button>
      </div>
    </>
  );
}

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

function CustomOnChangePlugin({
  onChange,
  name,
  updateField,
}: CustomOnChangePluginProps): null {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      console.log("Editor State", editorState);
      const editorStateJSON = editorState.toJSON();
      updateField(name, JSON.stringify(editorStateJSON));
      onChange(editorState);
    });
  }, [editor, onChange]);
  return null;
}

const Placeholder = () => {
  return (
    <div className="fixed top-[20rem] text-[1rem] text-white">
      Enter some text...
    </div>
  );
};

export default function LexicalEditor({
  name,
  updateField,
}: LexicalEditorProps) {
  return (
    <main className="relative">
      <LexicalComposer initialConfig={initialConfig}>
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="h-[20rem] w-[100%] border border-dark-2 p-4 text-[1rem] text-light-2 dark:bg-slate-800" />
          }
          placeholder={<Placeholder />}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <CustomOnChangePlugin
          name={name}
          updateField={updateField}
          onChange={(editorState) => {}}
        />
        <MyCustomAutoFocusPlugin />
        <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        <ActionsPlugin />
      </LexicalComposer>
    </main>
  );
}
