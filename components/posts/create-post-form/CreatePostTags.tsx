import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FromFieldProps } from "@/types/create-post-form";

const CreatePostTags = ({ control }: FromFieldProps) => (
  <div className="pb-[1.25rem]">
    <FormField
      name="tags"
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex flex-row leading-[1.375rem] dark:text-light-2 md:py-[0.625rem]  md:text-[0.875rem]">
            Add or change tags (up to 5) so readers know what your story is
            about
          </FormLabel>
          <FormControl>
            <Input
              placeholder="Add a tag..."
              type="text"
              className="bg-light-2 px-[1.25rem] py-[0.625rem] text-[1rem] dark:bg-dark-4 dark:text-light-2"
              {...field}
            />
          </FormControl>
          <FormMessage className="capitalize text-red-500" />
        </FormItem>
      )}
    />
  </div>
);

export default CreatePostTags;
