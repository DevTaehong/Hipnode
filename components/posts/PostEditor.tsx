"use client";

import React, { useEffect, useState, useRef } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import "./EditorStyles.css";

type PostEditorProps = {
  name: string;
  setFormValue: (name: string, value: string) => void;
};

function PostEditor({ name, setFormValue }: PostEditorProps) {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      const rawContent = convertToRaw(editorState.getCurrentContent());
      setFormValue(name, JSON.stringify(rawContent));
    }
  }, [editorState, name, setFormValue]);

  return (
    <Editor
      toolbarClassName={`bg-light dark:bg-dark-4 flex justify-center items-center h-[2rem] rounded-2xl`}
      editorState={editorState}
      onEditorStateChange={setEditorState}
      toolbar={{
        options: ["inline", "link", "list", "image", "textAlign"],
        inline: {
          options: ["bold", "italic", "underline", "strikethrough"],
        },
        list: {
          options: ["unordered", "ordered"],
        },
        textAlign: {
          options: ["left", "center", "right"],
        },
        link: {
          showOpenOptionOnHover: true,
          inDropdown: false,
          defaultTargetOption: "_blank",
        },
        image: {
          urlEnabled: true,
          uploadEnabled: true,
          alignmentEnabled: false,
          previewImage: true,
          inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
        },
      }}
    />
  );
}

export default PostEditor;
