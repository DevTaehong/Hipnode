import { useImageUpload } from "@/hooks/useImageUpload";
import { ImageUploadProps } from "@/types/upload-image";

const ImageUpload = ({ bucketName, folderName }: ImageUploadProps) => {
  const { handleFileChange, handleSubmit } = useImageUpload({
    bucketName,
    folderName,
  });

  return (
    <>
      <input type="file" accept=".png,.jpeg,.jpg" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Upload</button>
    </>
  );
};

export default ImageUpload;
