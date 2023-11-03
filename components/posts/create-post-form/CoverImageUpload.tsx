import OutlineIcon from "@/components/icons/outline-icons";
import ImageUpload from "@/components/image-upload/ImageUpload";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { CoverImageUploadProps } from "@/types/posts";

const CoverImageUpload = ({
  control,
  setImagePreviewUrl,
  setImageToUpload,
}: CoverImageUploadProps) => (
  <FormField
    control={control}
    name="coverImage"
    render={() => (
      <FormItem>
        <FormControl>
          <ImageUpload
            onFileSelected={(file) => {
              const reader = new FileReader();
              reader.onloadend = function () {
                setImagePreviewUrl(reader.result as string);
              };
              reader.readAsDataURL(file);
              setImageToUpload(file);
            }}
          >
            <div className="flex h-10 w-fit cursor-pointer flex-row items-center rounded-md   px-[0.8rem] py-[0.25rem] dark:bg-dark-4">
              <OutlineIcon.ImageIcon />
              <p className="pl-[0.625rem] text-[0.563rem] dark:text-light-2 sm:text-[0.625rem] md:leading-[1.5rem]">
                Set Cover
              </p>
            </div>
          </ImageUpload>
        </FormControl>
        <FormMessage className="capitalize text-red-500" />
      </FormItem>
    )}
  />
);

export default CoverImageUpload;
