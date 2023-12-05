import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreatePostTitleProps } from "@/types/posts";

const CreatePostTitle = ({ control }: CreatePostTitleProps) => (
  <FormField
    name="heading"
    control={control}
    render={({ field }) => (
      <FormItem className="relative">
        <FormControl>
          <Input
            placeholder="Title..."
            type="text"
            className="w-full bg-light-2 dark:bg-dark-4 dark:text-light-2 md:px-[1.25rem] md:py-[0.688rem] md:text-[1rem]"
            {...field}
          />
        </FormControl>

        <FormMessage className="absolute py-2 capitalize text-red-500" />
      </FormItem>
    )}
  />
);

export default CreatePostTitle;
