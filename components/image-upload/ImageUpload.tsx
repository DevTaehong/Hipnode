import { useImageUpload } from '@/hooks/useImageUpload';
import { ImageUploadProps } from '@/types';

const ImageUpload = ({ bucketName }: ImageUploadProps) => {
  const { handleFileChange, handleSubmit } = useImageUpload({
    bucketName,
  });

  return (
    <>
      <input type="file" accept=".png,.jpeg,.jpg" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Upload</button>
    </>
  );
};

export default ImageUpload;
