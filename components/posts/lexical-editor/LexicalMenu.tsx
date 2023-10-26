"use client";

import React, { useEffect, useState } from "react";

import DOMPurify from "dompurify";
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

import PostPreview from "../PostPreview";
import { Icon } from "@/components/icons/outline-icons";

const LowPriority = 1;

type LexicalMenuState = {
  isBold: boolean;
  isCode: boolean;
  isItalic: boolean;
  isStrikethrough: boolean;
  isUnderline: boolean;
};

type FormValues = {
  title: string;
  mainText: string;
  coverImage?: string;
  group: string;
  post: string;
  tagStringsInput: string;
};

type LexicalMenuProps = {
  editor: ReturnType<typeof useLexicalComposerContext>[0];
  editorHtmlString: string;
  autoFocus: boolean;
  setAutoFocus: React.Dispatch<React.SetStateAction<boolean>>;
  editorRef: React.RefObject<HTMLDivElement>;
  imagePreviewUrl: string;
  onSubmitPreview: () => void;
  previewValues?: FormValues | null;
};

export function LexicalMenu({
  editor,
  autoFocus,
  setAutoFocus,
  editorRef,
  editorHtmlString,
  imagePreviewUrl,
  onSubmitPreview,
  previewValues,
}: LexicalMenuProps) {
  const [canUndo, setCanUndo] = useState(false);
  const [htmlString, setHtmlString] = useState("");
  const [canRedo, setCanRedo] = useState(false);

  console.log(canRedo);

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
          <Icon.Edit className={autoFocus ? "fill-blue-80" : "fill-light-2"} />
          <p
            className={`${
              autoFocus ? "text-blue-80" : "text-light-2"
            } text-[0.875rem]`}
          >
            Write
          </p>
        </div>
        <PostPreview
          imagePreviewUrl={imagePreviewUrl}
          htmlString={htmlString}
          onSubmitPreview={onSubmitPreview}
          previewValues={previewValues}
        />
      </div>
      <div className="flex-wrap">
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
    </div>
  );
}

export default LexicalMenu;

//  {/* <p className="flex items-center dark:text-light-2 md:text-[1rem]  md:leading-[1.5rem]">
//           Code of Conduct
//         </p> */}
