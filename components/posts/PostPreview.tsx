import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Icon } from "@/components/icons/outline-icons";

type PostPreviewProps = {
  imagePreviewUrl: string;
  htmlString: string;
};

const PostPreview = ({
  imagePreviewUrl,
  htmlString,
  previewValues,
  onSubmitPreview,
}: PostPreviewProps) => {
  console.log(previewValues);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" onClick={() => onSubmitPreview()}>
          <p className="flex cursor-pointer items-center text-[0.875rem] dark:text-light-2 md:text-[1rem] md:leading-[1.5rem]">
            <div className="flex items-center gap-[0.625rem]">
              <Icon.View />
              <p className="pr-4">Preview</p>
            </div>
          </p>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Preview of your Post</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center p-6">
          <Image
            src={imagePreviewUrl || "/emoji_2.png"}
            height={125}
            width={125}
            alt="image"
            className="rounded-md"
          />
        </div>
        <div dangerouslySetInnerHTML={{ __html: htmlString }} />
      </DialogContent>
    </Dialog>
  );
};

export default PostPreview;
