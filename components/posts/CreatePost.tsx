"use client";

import { useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import CustomButton from "../CustomButton";
import { Icon } from "@/components/icons/outline-icons";

import LexicalEditor from "./lexical-editor/LexicalEditor";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const validationSchema = z.object({
  title: z.string().min(1, {
    message: "Name is required",
  }),
  mainText: z.string().min(1, { message: "Main Text is required" }),
  coverImage: z.any(),
  group: z.string().min(1, { message: "Select Group is required" }),
  post: z.string().min(1, { message: "Select Post is required" }),
  tagStringsInput: z.string().min(1, { message: "Input is required" }),
});

type FormValues = z.infer<typeof validationSchema>;

const GROUP = ["Alex", "Glen", "Taehong", "Tye", "Jay"];
const POST = ["Newest", "New", "Old", "Older", "Oldest"];

export default function CreatePost() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(validationSchema),
    mode: "onBlur",
    defaultValues: {
      title: "",
      mainText: "",
      coverImage: "",
      group: "",
      post: "",
      tagStringsInput: "",
    },
  });

  const { handleSubmit, setValue, watch } = form;

  const onSubmit = (values: FormValues) => {
    console.log("onSubmit function called");
    console.log("onSubmit called with values:", values);
    console.log(values);

    form.reset();
  };

  useEffect(() => {
    const data = watch();
    console.log(data.mainText);
  });

  return (
    <div className="flex h-screen w-full items-center justify-center dark:bg-dark-2">
      <Form {...form}>
        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className="w-[55rem] rounded-md p-[1.25rem] dark:bg-dark-3"
        >
          <div className="pb-[1.25rem]">
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Title..."
                      type="text"
                      className="w-full dark:bg-dark-4 dark:text-light-2 md:px-[1.25rem] md:py-[0.688rem] md:text-[1rem]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="capitalize text-red-500" />
                </FormItem>
              )}
            />
          </div>
          <div>
            <div className="flex flex-row items-center gap-4 dark:bg-dark-3">
              <FormField
                control={form.control}
                name="coverImage"
                render={() => (
                  <FormItem>
                    <FormControl>
                      <div>
                        <input
                          type="file"
                          id="coverImage"
                          name="coverImage"
                          accept=".jpg,.jpeg,.png"
                          style={{ display: "none" }}
                          ref={inputRef}
                          onChange={(event) => {
                            const file =
                              event.target.files && event.target.files[0];
                            console.log("File selected:", file);

                            if (file) {
                              form.setValue("coverImage", file);
                              console.log("File set as coverImage:", file);
                            }
                          }}
                        />
                        <div
                          className="cursor-pointer dark:bg-dark-2"
                          onClick={() => {
                            if (inputRef.current) {
                              inputRef.current.click();
                            }
                          }}
                        >
                          <div className="flex w-fit flex-row rounded-md dark:bg-dark-4 md:px-[0.625rem] md:py-[0.25rem]">
                            <Icon.Image />
                            <p className="pl-[0.625rem] dark:text-light-2 md:text-[1rem] md:leading-[1.5rem]">
                              Set Cover
                            </p>
                          </div>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage className="capitalize text-red-500" />
                  </FormItem>
                )}
              />
              <Controller
                name={"group"}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Select
                      value={String(field.value)}
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                    >
                      <FormControl>
                        <SelectTrigger className="flex min-w-[7rem] justify-between border-none p-0 px-3  text-[1rem] dark:bg-dark-4 dark:text-light-2">
                          <SelectValue
                            placeholder={
                              <div className="flex w-fit flex-row rounded-md dark:bg-dark-4 md:px-[0.625rem] md:py-[0.25rem]">
                                <p className=" dark:text-light-2 md:text-[1rem] md:leading-[1.5rem]">
                                  Select Group
                                </p>
                              </div>
                            }
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="z-50 cursor-pointer p-3 pl-2 dark:bg-dark-2 dark:text-light-2 md:text-[1rem] md:leading-[1.5rem]">
                        {GROUP.map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Controller
                control={form.control}
                name={"post"}
                render={({ field }) => (
                  <FormItem>
                    <Select
                      value={String(field.value)}
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                    >
                      <FormControl>
                        <SelectTrigger className="flex min-w-[7rem] justify-between border-none p-0 px-3  text-[1rem] dark:bg-dark-4 dark:text-light-2">
                          <SelectValue
                            placeholder={
                              <div className="flex w-fit  flex-row rounded-md dark:bg-dark-4 md:px-[0.625rem] md:py-[0.25rem]">
                                <p className=" dark:text-light-2 md:text-[1rem] md:leading-[1.5rem]">
                                  Create Post
                                </p>
                              </div>
                            }
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="z-50 cursor-pointer p-3 pl-2 dark:bg-dark-2 dark:text-light-2 md:text-[1rem] md:leading-[1.5rem]">
                        {POST.map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="relative flex flex-col pb-[1.25rem] pt-[2.5rem]">
            <div className="absolute left-[1.25rem] top-2 flex w-fit flex-row justify-start rounded-t-md dark:bg-dark-4">
              <div className="flex flex-row">
                <div className="flex items-center dark:text-blue-80">
                  <Icon.Edit className="dark:fill-blue-80 " />
                  <p className="md:pl-[0.625rem] md:pr-[1.875rem]"> Write</p>
                </div>
                <p className="flex items-center dark:text-light-2 md:text-[1rem] md:leading-[1.5rem]">
                  <div className="flex items-center">
                    <Icon.View />
                    <p className="md:pl-[0.625rem] md:pr-[1.875rem]">Preview</p>
                  </div>
                </p>
                <p className="w-fit dark:text-light-2 md:text-[1rem] md:leading-[1.5rem]">
                  Code of Conduct
                </p>
              </div>
            </div>
            <div className="min-h-[22rem]">
              <FormField
                name="mainText"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <LexicalEditor name="mainText" updateField={setValue} />
                    </FormControl>
                    <FormMessage className="capitalize text-red-500" />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="md:pb-[1.25rem]">
            <FormField
              name="tagStringsInput"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="leading-[1.375rem] dark:text-light-2 md:py-[0.625rem]  md:text-[0.875rem]">
                    Add or change tags (up to 5) so readers know what your story
                    is about
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Add a tag..."
                      type="text"
                      className="px-[1.25rem] py-[0.625rem] text-[1rem] dark:bg-dark-2 dark:text-light-2"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="capitalize text-red-500" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-row gap-4">
            <CustomButton
              type="submit"
              label="Publish"
              className="rounded-md bg-blue text-blue-10 md:px-[2.5rem] md:py-[0.625rem] md:text-[1rem] md:leading-[1.5rem]"
            />
            <CustomButton
              type="button"
              label="Cancel"
              className="rounded-md bg-dark-3 text-sc-3 md:px-[2.5rem] md:py-[0.625rem] md:text-[1rem] md:leading-[1.5rem]"
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
