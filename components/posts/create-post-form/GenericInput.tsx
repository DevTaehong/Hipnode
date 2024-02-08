import { PostFormValuesType } from "@/constants/posts";

import { Control } from "react-hook-form";

import { ChangeEvent } from "react";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface GenericInputProps {
  control: Control<PostFormValuesType>;
  name: keyof PostFormValuesType;
  label?: string;
  placeholder: string;
  type?: string;
  className?: string;
}

const GenericInput = ({
  control,
  name,
  label,
  placeholder,
  type,
  className,
}: GenericInputProps) => {
  const handleNumericalChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/[^0-9]/g, "");
    const intValue = parseInt(value) || 0;
    return (intValue / 100).toFixed(2);
  };

  return (
    <>
      <FormField
        name={name}
        control={control as any}
        render={({ field }) => (
          <FormItem className="flex w-full flex-col justify-start">
            <FormLabel className="pb-2.5 text-[0.875rem] font-semibold leading-none">
              {label}
            </FormLabel>
            <FormControl>
              <Input
                className={cn(
                  "w-full rounded-lg border-2 border-light-2 bg-light dark:border-dark-4 dark:bg-dark-3 dark:text-light-2 px-[1.25rem] py-[0.688rem]",
                  className
                )}
                {...field}
                placeholder={
                  type === "numerical" ? "Add salary..." : placeholder
                }
                type={type}
                onFocus={(e) => {
                  if (type === "numerical") {
                    e.target.placeholder = "00.00";
                  }
                }}
                onBlur={(e) => {
                  if (type === "numerical") {
                    e.target.placeholder = "Add salary...";
                  }
                }}
                onChange={(e) => {
                  if (type === "numerical") {
                    const newValue = handleNumericalChange(e);
                    field.onChange(newValue);
                  }
                  field.onChange(e);
                }}
              />
            </FormControl>
            <FormMessage className="py-1 pl-2 capitalize text-red-80" />
          </FormItem>
        )}
      ></FormField>
    </>
  );
};

export default GenericInput;
