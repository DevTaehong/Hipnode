import React, { useEffect, useRef, useState } from "react";

import { useImageUpload } from "@/hooks/useImageUpload";
import { ImageUploadProps } from "@/types";

const ImageUpload = ({
  bucketName,
  folderName,
  onUploadComplete,
  children,
}: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageSelected, setImageSelected] = useState(false);

  const { handleFileChange, handleSubmit, publicURL } = useImageUpload({
    bucketName,
    folderName,
  });

  useEffect(() => {
    if (publicURL && onUploadComplete) {
      onUploadComplete(publicURL);
      setImageSelected(false);
    }
  }, [publicURL, onUploadComplete]);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageSelected(true);
    }
    handleFileChange(e);
  };

  const handleUploadClick = () => {
    if (imageSelected) {
      handleSubmit();
    } else {
      fileInputRef.current?.click();
    }
  };

  return (
    <>
      <input
        type="file"
        accept=".png,.jpeg,.jpg"
        onChange={handleFileInputChange}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
      <div onClick={handleUploadClick}>
        {imageSelected ? "Upload Image" : children}
      </div>
    </>
  );
};

export default ImageUpload;
