import { FC } from "react";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormFieldComponentProps } from "@/types";

const FormFieldComponent: FC<FormFieldComponentProps> = ({
  control,
  name,
  label,
  placeholder,
  fieldType = "input",
}) => (
  <FormField
    control={control}
    name="groupName"
    render={({ field }) => (
      <FormItem className="flex flex-col gap-2.5">
        <FormLabel>{label}</FormLabel>
        <FormControl>
          {fieldType === "input" ? (
            <Input
              placeholder={placeholder}
              {...field}
              className="placeholder:regular-12 placeholder:sm:regular-14 h-[2.625rem] rounded-lg border-2 border-light-2 py-3 pl-5 pr-2.5 placeholder:text-sc-3 dark:border-dark-4 dark:bg-dark-3 sm:h-[2.875rem] sm:bg-light-2"
            />
          ) : (
            <textarea
              className="placeholder:regular-12 placeholder:sm:regular-14 h-[6.875rem] resize-none rounded-lg border-2 border-light-2 py-3 pl-5 pr-2.5 placeholder:text-sc-3 dark:border-dark-4 dark:bg-dark-3 sm:h-36 sm:bg-light-2"
              placeholder={placeholder}
              {...field}
            />
          )}
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default FormFieldComponent;
