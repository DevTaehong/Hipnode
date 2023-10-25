import { useImageUpload } from "@/hooks/useImageUpload";
import { ImageUploadProps } from "@/types";
import { useEffect } from "react";

const ImageUpload = ({
  bucketName,
  folderName,
  onUploadComplete,
}: ImageUploadProps) => {
  const { handleFileChange, handleSubmit, publicURL } = useImageUpload({
    bucketName,
    folderName,
  });

  useEffect(() => {
    if (publicURL && onUploadComplete) {
      onUploadComplete(publicURL);
    }
  }, [publicURL, onUploadComplete]);

  return (
    <>
      <input type="file" accept=".png,.jpeg,.jpg" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Upload</button>
    </>
  );
};

export default ImageUpload;
