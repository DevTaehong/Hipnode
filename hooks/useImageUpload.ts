import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { supabase } from "@/utils/supabaseClient";
import {
  ImageUploadProps,
  UseImageUploadReturn,
  InputChangeEvent,
} from "@/types";

export const useImageUpload = ({
  bucketName,
  folderName,
}: ImageUploadProps): UseImageUploadReturn => {
  const [file, setFile] = useState<File | null>(null);
  const [publicURL, setPublicURL] = useState<string | null>(null);

  const handleFileChange = (e: InputChangeEvent) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      console.error("No file selected");
      return;
    }

    try {
      const fileExtension = file.name.split(".").pop();
      const prefix = folderName && folderName.trim() ? `${folderName}/` : "";
      const uniqueFileName = `${prefix}image_${uuidv4()}.${fileExtension}`;

      const { error } = await supabase.storage
        .from(bucketName)
        .upload(uniqueFileName, file, { contentType: file.type });

      if (error) {
        console.error("File upload error:", error.message);
      } else {
        console.log("File uploaded successfully:", uniqueFileName);
        const projectUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}`;
        const newPublicURL = `${projectUrl}/storage/v1/object/public/${bucketName}/${uniqueFileName}`;
        setPublicURL(newPublicURL);

        setFile(null);
      }
    } catch (error) {
      if (error instanceof Error)
        console.error("Unexpected error:", error.message);
    }
  };

  console.log(publicURL);
  return {
    file,
    publicURL,
    handleFileChange,
    handleSubmit,
  };
};
