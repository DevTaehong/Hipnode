import { LexicalComposer } from "@lexical/react/LexicalComposer";

import { LexicalEditorProps } from "@/types/lexical-editor";
import { MainLexicalEditor } from ".";
import { initialConfig } from "@/constants/lexical-editor";

const LexicalEditor = ({
  name,
  updateField,
  onSubmitPreview,
  defaultContent,
}: LexicalEditorProps & { defaultContent: string }) => {
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <MainLexicalEditor
        name={name}
        updateField={updateField}
        onSubmitPreview={onSubmitPreview}
        defaultContent={defaultContent}
      />
    </LexicalComposer>
  );
};

export default LexicalEditor;
