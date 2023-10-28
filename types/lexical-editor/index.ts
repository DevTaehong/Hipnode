import React from "react";
import { EditorState } from "lexical";
import type { UseFormSetValue } from "react-hook-form";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PostFormValuesType } from "@/lib/validations";

export type LexicalEditorProps = {
  config?: Parameters<typeof LexicalComposer>["0"]["initialConfig"];
  name: keyof PostFormValuesType;
  updateField: UseFormSetValue<PostFormValuesType>;
  imagePreviewUrl: string;
  onSubmitPreview: () => void;
  previewValues?: PostFormValuesType;
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
