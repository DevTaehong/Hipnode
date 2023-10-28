import { LexicalComposer } from "@lexical/react/LexicalComposer";

import { LexicalEditorProps } from "@/types/lexical-editor";
import { MainLexicalEditor } from ".";
import { initialConfig } from "@/constants/lexical-editor";

export default function LexicalEditor({
  name,
  updateField,
  onSubmitPreview,
}: LexicalEditorProps) {
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <MainLexicalEditor
        name={name}
        updateField={updateField}
        onSubmitPreview={onSubmitPreview}
      />
    </LexicalComposer>
  );
}
