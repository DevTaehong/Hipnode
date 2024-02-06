import { FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { SelectControllerProps } from "@/types/posts";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
} from "@/components/ui/select";

import { ChevronUp, ChevronDown } from "lucide-react";

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
              <SelectTrigger className="hover-effect flex justify-between border-none bg-light-2 text-sc-2 dark:bg-dark-4 dark:text-light-2">
                <SelectValue
                  placeholder={
                    <p className="flex items-center justify-start text-[0.563rem] sm:text-[0.875rem] md:leading-[1.375rem]">
                      {placeholder}
                    </p>
                  }
                />
                {openState[name] ? (
                  <ChevronUp className="mx-2 size-4 text-sc-2 dark:text-light-2" />
                ) : (
                  <ChevronDown className="mx-2 size-4 text-sc-2 dark:text-light-2" />
                )}
              </SelectTrigger>
            </FormControl>
            <SelectContent className="flex size-full flex-col gap-2.5 rounded-xl border-light bg-light p-3 shadow-lg dark:border-dark-4 dark:bg-dark-4">
              <SelectGroup>
                {options?.map((option, index) => {
                  const IconComponent: any = option.icon;

                  return (
                    <SelectItem
                      className="hover-effect flex cursor-pointer items-center justify-between gap-2 space-y-2.5 bg-light dark:bg-dark-4 dark:text-light-2"
                      key={index}
                      value={option.label}
                    >
                      <div className="flex flex-row items-center justify-between gap-2 dark:bg-dark-4">
                        {option.icon && (
                          <IconComponent className="w-4 fill-sc-2 dark:fill-light-2 sm:w-5" />
                        )}
                        <p
                          className={`flex items-center text-[0.563rem] sm:text-[0.875rem] md:leading-[1.375rem] ${
                            option.icon
                              ? "ml-2"
                              : "text-base font-semibold capitalize leading-6 dark:text-light-2"
                          }`}
                        >
                          {option.label}
                        </p>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormMessage className="absolute py-2 pl-2 capitalize text-red-80">
            {/* @ts-ignore */}
            {errors?.[name]?.message ? (errors[name].message as string) : null}
          </FormMessage>
        </FormItem>
      )}
    />
  );
};

export default SelectController;
