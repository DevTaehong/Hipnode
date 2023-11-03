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
    name="title"
    control={control}
    render={({ field }) => (
      <FormItem>
        <FormControl>
          <Input
            placeholder="Title..."
            type="text"
            className="w-full bg-light-2 dark:bg-dark-4 dark:text-light-2 md:px-[1.25rem] md:py-[0.688rem] md:text-[1rem]"
            {...field}
          />
        </FormControl>

        <FormMessage className="capitalize text-red-500" />
      </FormItem>
    )}
  />
);

export default CreatePostTitle;
