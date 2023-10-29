import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import OutlineIcon from "@/components/icons/outline-icons";
import { PostPreviewProps } from "@/types/create-post-form";
import { useCreatePostStore } from "@/app/lexicalStore";

const PostPreview = ({ htmlString, onSubmitPreview }: PostPreviewProps) => {
  const { imagePreviewUrl, previewValues } = useCreatePostStore(
    (state) => state
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" onClick={() => onSubmitPreview()}>
          <p className="flex cursor-pointer items-center text-[0.875rem] dark:text-light-2 md:text-[1rem] md:leading-[1.5rem]">
            <div className="flex items-center gap-[0.625rem]">
              <OutlineIcon.View />
              <p className="pr-4">Preview</p>
            </div>
          </p>
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[50rem] max-w-[49rem] overflow-scroll px-[1.25rem] dark:bg-dark-3">
        <div className="flex items-center justify-center p-6">
          <Image
            src={imagePreviewUrl || "/emoji_2.png"}
            height={125}
            width={125}
            alt="image"
            className="h-[17rem] w-auto rounded-md"
          />
        </div>
        <DialogHeader>
          <DialogTitle className="flex flex-row justify-start text-[1rem] font-semibold leading-[1.5rem] text-sc-2 dark:text-light-2 md:text-[1.625rem] md:font-normal md:leading-[2.375rem]">
            {previewValues?.title}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-wrap justify-start gap-6 ">
          {previewValues?.tags.map((tag) => (
            <p
              key={tag}
              className="text-[1rem] font-normal leading-[1.5rem] text-yellow-90"
            >
              #{tag}
            </p>
          ))}
        </div>
        <div className="text-[0.875rem] leading-[1.5rem] text-sc-3 dark:text-sc-3 md:text-[1rem]">
          <div dangerouslySetInnerHTML={{ __html: htmlString }} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostPreview;
