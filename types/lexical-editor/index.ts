import React, { ComponentProps } from "react";
import { EditorState } from "lexical";
import type { UseFormSetValue } from "react-hook-form";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PostFormValuesType } from "../create-post-form";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

export type LexicalEditorProps = {
  config?: Parameters<typeof LexicalComposer>["0"]["initialConfig"];
  name: keyof PostFormValuesType;
  updateField: UseFormSetValue<PostFormValuesType>;
  imagePreviewUrl: string;
  onSubmitPreview: () => void;
  previewValues?: PostFormValuesType;
  clearEditor: boolean;
  setClearEditor: React.Dispatch<React.SetStateAction<boolean>>;
};

export type CustomOnChangePluginProps = {
  onChange: (editorState: EditorState) => void;
  name: keyof PostFormValuesType;
  updateField: UseFormSetValue<PostFormValuesType>;
};

export type CustomAutoFocusPluginProps = {
  autoFocus: boolean;
  setAutoFocus: React.Dispatch<React.SetStateAction<boolean>>;
};

export type IconType =
  | "bold"
  | "code"
  | "copy"
  | "italic"
  | "link"
  | "underline"
  | "strike"
  | "check"
  | "trash"
  | "alignLeft"
  | "alignCenter"
  | "alignRight"
  | "alignJustify"
  | "clockwiseArrow"
  | "antiClockwiseArrow"
  | "unorderedList"
  | "orderedList";

export type LexicalIconButtonsProps = {
  active?: boolean;
  icon?: IconType;
} & ComponentProps<"button">;

export type LexicalMenuState = {
  isBold: boolean;
  isCode: boolean;
  isItalic: boolean;
  isStrikethrough: boolean;
  isUnderline: boolean;
};

export type LexicalMenuProps = {
  editor: ReturnType<typeof useLexicalComposerContext>[0];
  editorHtmlString: string;
  autoFocus: boolean;
  setAutoFocus: React.Dispatch<React.SetStateAction<boolean>>;
  editorRef: React.RefObject<HTMLDivElement>;
  imagePreviewUrl: string;
  onSubmitPreview: () => void;
  clearEditor: boolean;
  setClearEditor: React.Dispatch<React.SetStateAction<boolean>>;
  previewValues?: PostFormValuesType | null;
};
