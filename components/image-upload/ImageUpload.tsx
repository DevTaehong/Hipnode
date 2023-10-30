import React, { useRef, useState } from "react";
import { ImageUploadProps } from "@/types/upload-image";

const ImageUpload = ({ onFileSelected, children }: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageSelected, setImageSelected] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageSelected(true);
      onFileSelected(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    if (imageUploaded) {
      fileInputRef.current?.click();
    } else if (imageSelected) {
      setImageUploaded(true);
      setImageSelected(false);
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
      <div
        className="cursor-pointer rounded-md text-[0.8rem] dark:bg-dark-4 dark:text-light-2"
        onClick={handleUploadClick}
      >
        {imageSelected ? (
          <p className="cursor-pointer rounded-md p-2.5 text-[0.8rem] text-sc-3 dark:bg-dark-4 dark:text-light-2">
            Upload Image
          </p>
        ) : imageUploaded ? (
          <p className="cursor-pointer rounded-md p-2.5 text-[0.8rem] text-sc-3 dark:bg-dark-4 dark:text-light-2">
            Replace Image
          </p>
        ) : (
          children
        )}
      </div>
    </>
  );
};

export default ImageUpload;
