import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import OutlineIcon from "@/components/icons/outline-icons";
import { PostPreviewProps } from "@/types/posts";
import { useCreatePostContext } from "@/app/contexts/CreatePostContext";

const PostPreview = ({ htmlString, onSubmitPreview }: PostPreviewProps) => {
  const { imagePreviewUrl, previewValues } = useCreatePostContext();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" onClick={() => onSubmitPreview()}>
          <p className="flex cursor-pointer items-center text-[0.875rem] md:text-[1rem] md:leading-[1.5rem] dark:text-light-2">
            <div className="flex items-center gap-[0.625rem]">
              <OutlineIcon.View />
              <p className="pr-4">Preview</p>
            </div>
          </p>
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[50rem] w-full max-w-[49rem] overflow-scroll px-[1.25rem] dark:bg-dark-3 ">
        <div className="flex grow items-center justify-center pt-6">
          {imagePreviewUrl ? (
            <Image
              src={imagePreviewUrl}
              height={125}
              width={125}
              alt="image"
              className="h-[17rem] w-full rounded-t-md border-x-2 border-t-2 object-cover dark:border-sc-3"
            />
          ) : (
            <div className="relative flex h-[17rem] w-full items-center justify-center rounded-t-md bg-gray-200 dark:bg-gray-700">
              <p className="animate-pulse text-sc-2 dark:text-light-2">
                Your media image goes here....🫠🫠🫠🫠
              </p>
            </div>
          )}
        </div>
        <DialogHeader>
          <DialogTitle className="flex flex-row justify-start px-12 text-[1rem] font-semibold leading-[1.5rem] text-sc-2 md:text-[1.625rem] md:font-normal md:leading-[2.375rem] dark:text-light-2">
            {previewValues?.heading ? (
              previewValues.heading
            ) : (
              <p className="animate-pulse text-sc-2 dark:text-light-2">
                Your title here ....
              </p>
            )}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-wrap  justify-start gap-6 px-12">
          {previewValues?.tags?.length !== 0
            ? previewValues?.tags?.map((tag: string) => (
                <p
                  key={tag}
                  className="text-[1rem] font-normal leading-[1.5rem] text-yellow-90"
                >
                  #{tag}
                </p>
              ))
            : Array.from({ length: 3 }).map((_, index) => (
                <p
                  key={index}
                  className="animate-pulse text-[1rem] font-normal leading-[1.5rem] text-yellow-90"
                >
                  {`#tag ${index + 1}`}
                </p>
              ))}
        </div>
        {htmlString && htmlString.length < 11 ? (
          <div className="px-12 text-[0.875rem] leading-[1.5rem] text-sc-3 md:text-[1rem] dark:text-sc-3">
            <div dangerouslySetInnerHTML={{ __html: htmlString }} />
          </div>
        ) : (
          <div className="animate-pulse  rounded px-12">
            <p className="md:text-[1rem} pl-4 px-2 py-8 mb-[1.25rem] rounded bg-gray-200 text-[0.875rem] leading-[1.5rem] text-sc-3 dark:bg-gray-700 dark:text-sc-3">
              Your media content......
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PostPreview;
