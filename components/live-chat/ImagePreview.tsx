import Image from "next/image";
import { IoClose } from "react-icons/io5";

interface ImagePreviewProps {
  setImagePreview: (value: string | null) => void;
  setDroppedFile: (value: File | null) => void;
  imagePreview: string;
}

const ImagePreview = ({
  setImagePreview,
  setDroppedFile,
  imagePreview,
}: ImagePreviewProps) => {
  return (
    <figure className="relative flex w-fit">
      <button className="flex-center absolute right-0 top-0 h-5 w-5 bg-white/80">
        <IoClose
          className="cursor-pointer text-[20px]"
          onClick={() => {
            setImagePreview(null);
            setDroppedFile(null);
          }}
        />
      </button>
      <Image
        src={imagePreview}
        height={250}
        width={250}
        className="mb-3"
        alt="Image preview"
      />
    </figure>
  );
};

export default ImagePreview;
