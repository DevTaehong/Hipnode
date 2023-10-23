"use client";

import { useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND } from "lexical";

import { IconButton } from "./IconButton";

type LexicalMenuState = {
  isBold: boolean;
  isCode: boolean;
  isItalic: boolean;
  isStrikethrough: boolean;
  isUnderline: boolean;
};

type LexicalMenuProps = {
  editor: ReturnType<typeof useLexicalComposerContext>[0];
};

export function LexicalMenu(props: LexicalMenuProps) {
  const { editor } = props;

  const [state, setState] = useState<LexicalMenuState>({
    isBold: false,
    isCode: false,
    isItalic: false,
    isStrikethrough: false,
    isUnderline: false,
  });

  useEffect(() => {
    const unregisterListener = editor.registerUpdateListener(
      ({ editorState }) => {
        editorState.read(() => {
          const selection = $getSelection();
          console.log(editorState);
          if (!$isRangeSelection(selection)) return;

          setState({
            isBold: selection.hasFormat("bold"),
            isCode: selection.hasFormat("code"),
            isItalic: selection.hasFormat("italic"),
            isStrikethrough: selection.hasFormat("strikethrough"),
            isUnderline: selection.hasFormat("underline"),
          });
        });
      }
    );

    return unregisterListener;
  }, [editor]);

  return (
    <div className="flex items-center justify-between gap-1 rounded-md border-[1px] border-slate-300 bg-slate-100 p-1">
      <IconButton
        icon="bold"
        aria-label="Format text as bold"
        active={state.isBold}
        onClick={() => {
          console.log(FORMAT_TEXT_COMMAND, "bold");
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
        }}
      />

      <IconButton
        icon="italic"
        aria-label="Format text as italics"
        active={state.isItalic}
        onClick={() => {
          console.log(FORMAT_TEXT_COMMAND, "italic");
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
        }}
      />

      <IconButton
        icon="underline"
        aria-label="Format text to underlined"
        active={state.isUnderline}
        onClick={() => {
          console.log(FORMAT_TEXT_COMMAND, "underline");
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
        }}
      />

      <IconButton
        icon="strike"
        aria-label="Format text with a strikethrough"
        active={state.isStrikethrough}
        onClick={() => {
          console.log(FORMAT_TEXT_COMMAND, "strikethrough");
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
        }}
      />

      <IconButton
        icon="code"
        aria-label="Format text with inline code"
        active={state.isCode}
        onClick={() => {
          console.log(FORMAT_TEXT_COMMAND, "code");
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code");
        }}
      />
    </div>
  );
}

export default LexicalMenu;
