import { FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { SelectControllerProps } from "@/types/posts";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Controller } from "react-hook-form";

const SelectController = ({
  control,
  name,
  placeholder,
  options,
  currentSelection,
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
      render={({ field, formState: { errors } }) => (
        <FormItem>
          <Select
            onOpenChange={() => handleOpenChange(name)}
            value={String(field.value)}
            onValueChange={(value) => {
              field.onChange(value);
            }}
          >
            <FormControl>
              <SelectTrigger className="flex min-w-[7rem] justify-between border-none text-[1rem] text-blue-80 dark:bg-dark-4">
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
            <SelectContent>
              {options?.map((option, index) => {
                const selected = currentSelection === option.label;
                const IconComponent: any = option.icon;

                return (
                  <SelectItem
                    className={`flex justify-between gap-2 bg-light dark:bg-dark-4  ${
                      selected ? "text-blue-80" : "dark:text-light-2"
                    }`}
                    key={index}
                    value={option.label}
                  >
                    <div className="flex flex-row justify-between gap-2 dark:bg-dark-4">
                      {option.icon && (
                        <IconComponent
                          className={` ${
                            selected
                              ? "fill-blue-80"
                              : "fill-sc-2 dark:fill-light-2"
                          }`}
                        />
                      )}
                      <p
                        className={`${
                          option.icon
                            ? "ml-2"
                            : `text-[1rem] font-semibold capitalize leading-[1.5rem] ${
                                selected ? "text-blue-80" : "dark:text-light-2"
                              }`
                        }`}
                      >
                        {option.label}
                      </p>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <FormMessage className="absolute py-2 pl-2 capitalize text-red-500">
            {/* @ts-ignore */}
            {errors?.[name]?.message ? (errors[name].message as string) : null}
          </FormMessage>
        </FormItem>
      )}
    />
  );
};

export default SelectController;
