"use client";

import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";

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

import { LexicalIconButtons } from ".";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from "@lexical/list";

import PostPreview from "@/components/posts/PostPreview";
import OutlineIcon from "@/components/icons/outline-icons";
import { LexicalMenuState, LexicalMenuProps } from "@/types/lexical-editor";
import { LowPriority } from "@/constants/lexical-editor";
import { useCreatePostStore } from "@/app/lexicalStore";

const LexicalMenu = ({
  editor,
  autoFocus,
  setAutoFocus,
  editorRef,
  editorHtmlString,
  onSubmitPreview,
}: LexicalMenuProps) => {
  const [canUndo, setCanUndo] = useState(false);
  const [htmlString, setHtmlString] = useState("");
  const [canRedo, setCanRedo] = useState(false);

  const { clearEditor, setClearEditor } = useCreatePostStore((state) => state);

  useEffect(() => {
    const sanitizedHtml = DOMPurify.sanitize(editorHtmlString);
    setHtmlString(sanitizedHtml);
  }, [editorHtmlString]);

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

  useEffect(() => {
    function handleDocumentClick(event: MouseEvent) {
      if (editorRef.current) {
        if (editorRef.current.contains(event.target as Node)) {
          setAutoFocus(true);
        } else {
          setAutoFocus(false);
        }
      }
    }

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [editorRef]);

  useEffect(() => {
    if (clearEditor) editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
    setClearEditor(false);
  }, [clearEditor]);

  return (
    <div
      ref={editorRef}
      className="flex w-full flex-wrap justify-between gap-2  rounded-md bg-light-2 px-[1.25rem] py-[1.125rem] dark:bg-dark-4"
    >
      <div className="flex justify-between gap-[1.25rem] md:gap-[1.875rem]">
        <div
          onClick={() => setAutoFocus(!autoFocus)}
          className="flex cursor-pointer items-center gap-[0.625rem] text-blue-80"
        >
          <OutlineIcon.Edit
            className={
              autoFocus ? "fill-blue-80" : "fill-sc-3 dark:fill-light-2"
            }
          />
          <p
            className={`${
              autoFocus ? "text-blue-80" : "text-sc-3 dark:text-light-2"
            } text-[0.875rem]`}
          >
            Write
          </p>
        </div>
        <PostPreview
          htmlString={htmlString}
          onSubmitPreview={onSubmitPreview}
        />
      </div>
      <div className="flex-wrap">
        <LexicalIconButtons
          icon="unorderedList"
          aria-label="Insert Unordered List"
          onClick={(e) => {
            editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
          }}
        />

        <LexicalIconButtons
          icon="orderedList"
          aria-label="Insert Unordered List"
          onClick={(e) => {
            editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
          }}
        />
        <LexicalIconButtons
          icon="bold"
          aria-label="Format text as bold"
          active={state.isBold}
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
          }}
        />

        <LexicalIconButtons
          icon="italic"
          aria-label="Format text as italics"
          active={state.isItalic}
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
          }}
        />

        <LexicalIconButtons
          icon="underline"
          aria-label="Format text to underlined"
          active={state.isUnderline}
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
          }}
        />

        <LexicalIconButtons
          icon="strike"
          aria-label="Format text with a strikethrough"
          active={state.isStrikethrough}
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
          }}
        />

        <LexicalIconButtons
          icon="code"
          aria-label="Format text with inline code"
          active={state.isCode}
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code");
          }}
        />
        <LexicalIconButtons
          icon="alignLeft"
          aria-label="Left Align"
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
          }}
        />

        <LexicalIconButtons
          icon="alignCenter"
          aria-label="Center Align"
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
          }}
        />

        <LexicalIconButtons
          icon="alignRight"
          aria-label="Right Align"
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
          }}
        />

        <LexicalIconButtons
          icon="alignJustify"
          aria-label="Justify Align"
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify");
          }}
        />
        <LexicalIconButtons
          icon="clockwiseArrow"
          aria-label="Redo"
          disabled={!canUndo}
          onClick={() => {
            editor.dispatchCommand(REDO_COMMAND, undefined);
          }}
        />
        <LexicalIconButtons
          icon="trash"
          disabled={!canUndo}
          onClick={() => {
            editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
          }}
        ></LexicalIconButtons>
        <LexicalIconButtons
          icon="antiClockwiseArrow"
          aria-label="Undo"
          disabled={!canUndo}
          onClick={() => {
            editor.dispatchCommand(UNDO_COMMAND, undefined);
          }}
        />
      </div>
    </div>
  );
};

export default LexicalMenu;
