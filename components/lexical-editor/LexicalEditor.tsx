import { LexicalComposer } from "@lexical/react/LexicalComposer";

import { LexicalEditorProps } from "@/types/lexical-editor";
import { MainLexicalEditor } from ".";
import { initialConfig } from "@/constants/lexical-editor";

export default function LexicalEditor({
  name,
  updateField,
  imagePreviewUrl,
  onSubmitPreview,
  previewValues,
  clearEditor,
}: LexicalEditorProps) {
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <MainLexicalEditor
        name={name}
        updateField={updateField}
        imagePreviewUrl={imagePreviewUrl}
        onSubmitPreview={onSubmitPreview}
        previewValues={previewValues}
        clearEditor={clearEditor}
      />
    </LexicalComposer>
  );
}
