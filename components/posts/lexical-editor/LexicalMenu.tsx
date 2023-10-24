"use client";

import { useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  CLEAR_EDITOR_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
} from "lexical";

import { IconButton } from "./IconButton";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from "@lexical/list";
const LowPriority = 1;

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
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
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

  useEffect(() => {
    const unregisterUndoCommand = editor.registerCommand(
      CAN_UNDO_COMMAND,
      (payload) => {
        setCanUndo(payload);
        return false;
      },
      LowPriority
    );

    const unregisterRedoCommand = editor.registerCommand(
      CAN_REDO_COMMAND,
      (payload) => {
        setCanRedo(payload);
        return false;
      },
      LowPriority
    );

    return () => {
      unregisterUndoCommand();
      unregisterRedoCommand();
    };
  }, [editor]);

  return (
    <div className="flex w-fit items-end justify-end gap-[0.3rem] rounded-md  bg-light-2  dark:bg-dark-4">
      <IconButton
        icon="unorderedList"
        aria-label="Insert Unordered List"
        onClick={(e) => {
          editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
        }}
      />

      <IconButton
        icon="orderedList"
        aria-label="Insert Unordered List"
        onClick={(e) => {
          editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
        }}
      />
      <IconButton
        icon="bold"
        aria-label="Format text as bold"
        active={state.isBold}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
        }}
      />

      <IconButton
        icon="italic"
        aria-label="Format text as italics"
        active={state.isItalic}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
        }}
      />

      <IconButton
        icon="underline"
        aria-label="Format text to underlined"
        active={state.isUnderline}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
        }}
      />

      <IconButton
        icon="strike"
        aria-label="Format text with a strikethrough"
        active={state.isStrikethrough}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
        }}
      />

      <IconButton
        icon="code"
        aria-label="Format text with inline code"
        active={state.isCode}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code");
        }}
      />
      <IconButton
        icon="alignLeft"
        aria-label="Left Align"
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
        }}
      />

      <IconButton
        icon="alignCenter"
        aria-label="Center Align"
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
        }}
      />

      <IconButton
        icon="alignRight"
        aria-label="Right Align"
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
        }}
      />

      <IconButton
        icon="alignJustify"
        aria-label="Justify Align"
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify");
        }}
      />
      <IconButton
        icon="clockwiseArrow"
        aria-label="Redo"
        disabled={!canUndo}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, undefined);
        }}
      />
      <IconButton
        icon="trash"
        disabled={!canUndo}
        onClick={() => {
          editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
        }}
      ></IconButton>
      <IconButton
        icon="antiClockwiseArrow"
        aria-label="Undo"
        disabled={!canUndo}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
      />
    </div>
  );
}

export default LexicalMenu;
