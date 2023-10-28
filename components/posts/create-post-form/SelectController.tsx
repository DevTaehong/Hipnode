import { FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { SelectControllerProps } from "@/types/create-post-form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@radix-ui/react-select";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Controller } from "react-hook-form";

const SelectController = ({
  control,
  name,
  placeholder,
  options,
}: SelectControllerProps) => {
  const [openState, setOpenState] = useState<Record<string, boolean>>({});

  const handleOpenChange = (name: string) => {
    setOpenState((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <Select
            onOpenChange={() => handleOpenChange(name)}
            value={String(field.value)}
            onValueChange={(value) => {
              field.onChange(value);
            }}
          >
            <FormControl>
              <SelectTrigger className="flex min-w-[7rem] justify-between border-none text-[1rem] dark:bg-dark-4 dark:text-light-2">
                <SelectValue
                  placeholder={
                    <div className="flex w-fit flex-row rounded-md px-[0.625rem] py-[0.25rem] dark:bg-dark-4">
                      <p className="text-[0.563rem] dark:text-light-2 sm:text-[0.625rem] md:leading-[1.5rem]">
                        {placeholder}
                      </p>
                    </div>
                  }
                />
                {openState[name] ? (
                  <ChevronUp className="h-4 w-4 text-white opacity-50" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-white opacity-50" />
                )}
              </SelectTrigger>
            </FormControl>
            <SelectContent className="z-50 cursor-pointer border-none text-[0.563rem] dark:bg-dark-3 dark:text-light-2 sm:text-[0.625rem] md:leading-[1.5rem]">
              {options.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage className="capitalize text-red-500" />
        </FormItem>
      )}
    />
  );
};

export default SelectController;
