"use client";

import { useRef } from "react";
import { useForm } from "react-hook-form";
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
import { FormatIcon, Icon, FrameIcon } from "@/components/icons/outline-icons";
import { ChevronDown } from "lucide-react";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@radix-ui/react-select";

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

  console.log("Form initialized", form);

  const onSubmit = (values: FormValues) => {
    console.log("onSubmit called with values:", values);
    console.log(values);

    const inputStr = values.tagStringsInput;
    let stringsArray = inputStr.includes(",")
      ? inputStr.split(",")
      : [inputStr];
    stringsArray = stringsArray.slice(0, 5);
    stringsArray = stringsArray.map((str) => str.trim());

    console.log("Processed stringsArray:", stringsArray);
  };

  return (
    <div className="flex h-screen w-full items-center justify-center dark:bg-dark-2">
      <Form {...form}>
        <form
          action=""
          onSubmit={form.handleSubmit((values) => {
            console.log("handleSubmit called with values:", values); // Log handleSubmit call and values
            onSubmit(values);
          })}
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
                      className="w-full dark:bg-dark-4 dark:text-sc-2 md:px-[1.25rem] md:py-[0.688rem] md:text-[1.625rem]"
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
                            console.log("File selected:", file); // Log file selection

                            if (file) {
                              form.setValue("coverImage", file);
                              console.log("File set as coverImage:", file); // Log file set as coverImage
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
              <FormField
                control={form.control}
                name="group"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        console.log("Group selected:", value); // Log group selection
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={
                              <div className="flex w-fit flex-row rounded-md dark:bg-dark-4 md:px-[0.625rem] md:py-[0.25rem]">
                                <p className=" dark:text-light-2 md:text-[1rem] md:leading-[1.5rem]">
                                  Select Group
                                </p>
                                <ChevronDown className="dark:text-light-2" />
                              </div>
                            }
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="pl-2 dark:text-light-2 md:text-[1rem] md:leading-[1.5rem]">
                        {["Alex", "Glen", "Taehong", "Tye", "Jay"].map(
                          (group) => (
                            <SelectItem key={group} value={group}>
                              {group}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="post"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        console.log("Post selected:", value); // Log post selection
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={
                              <div className="flex w-fit flex-row rounded-md dark:bg-dark-4 md:px-[0.625rem] md:py-[0.25rem]">
                                <p className=" dark:text-light-2 md:text-[1rem] md:leading-[1.5rem]">
                                  Create Post
                                </p>
                                <ChevronDown className="dark:text-light-2" />
                              </div>
                            }
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="pl-2 dark:text-light-2 md:text-[1rem] md:leading-[1.5rem]">
                        {["Newest", "New", "Old", "Older", "Oldest"].map(
                          (post) => (
                            <SelectItem key={post} value={post}>
                              {post}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex flex-col pb-[1.25rem] pt-[2.5rem] ">
            <div className="flex flex-row justify-between rounded-t-md dark:bg-dark-4 md:px-[1.25rem] md:py-[1.125rem]">
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
              <div className="flex flex-row items-center gap-[0.625rem]">
                <FormatIcon.Headline />
                <FormatIcon.Bold />
                <FormatIcon.Italic />
                <FormatIcon.Underline />
                <FormatIcon.Strikethrough />
                <Icon.Link />
                <Icon.Image />
                <FrameIcon.Left />
                <FrameIcon.Center />
                <FrameIcon.Right />
                <FrameIcon.Point />
                <FrameIcon.Point />
              </div>
            </div>
            <div className="">
              <FormField
                name="mainText"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <textarea
                        {...field}
                        placeholder="Tell your story..."
                        className="h-[20rem] w-full resize-none rounded-b-md p-2 text-green-300 dark:bg-dark-3 "
                      />
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
                      className="px-[1.25rem] py-[0.625rem] dark:bg-dark-2"
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
              type="submit"
              label="Cancel"
              className="rounded-md bg-dark-3 text-sc-3 md:px-[2.5rem] md:py-[0.625rem] md:text-[1rem] md:leading-[1.5rem]"
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
