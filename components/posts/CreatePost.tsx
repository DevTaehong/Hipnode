"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
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
import ImageUpload from "../image-upload/ImageUpload";
import { uploadImageToSupabase } from "./lexical-editor/UploadImageToSupabase";
import { ChevronUp, ChevronDown } from "lucide-react";

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
  const [htmlString, setHtmlString] = useState("");
  const [imageToUpload, setImageToUpload] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const [isGroupOpen, setIsGroupOpen] = useState(false);
  const [isPostOpen, setIsPostOpen] = useState(false);

  const handleUpload = async () => {
    if (imageToUpload) {
      const uploadedURL = await uploadImageToSupabase(
        imageToUpload,
        "posts",
        "images"
      );
      setValue("coverImage", uploadedURL);
    }
  };

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

  const { setValue, watch } = form;

  const onSubmit = async (values: FormValues) => {
    console.log(values);
    handleUpload();
    form.reset();
  };

  useEffect(() => {
    const data = watch();
    console.log(data.coverImage);
  }, []);

  const handleGroupChange = () => {
    setIsGroupOpen(!isGroupOpen);
  };

  const handlePostChange = () => {
    setIsPostOpen(!isPostOpen);
  };

  return (
    <div className="flex w-fit items-center justify-center rounded-md bg-light dark:bg-dark-3">
      <Form {...form}>
        <form
          action=""
          onSubmit={form.handleSubmit(onSubmit)}
          className="rounded-md p-[1.25rem] dark:bg-dark-3"
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
                      className="w-full bg-light-2 dark:bg-dark-4 dark:text-light-2 md:px-[1.25rem] md:py-[0.688rem] md:text-[1rem]"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage className="capitalize text-red-500" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-row items-center gap-4 dark:bg-dark-3">
            <FormField
              control={form.control}
              name="coverImage"
              render={() => (
                <FormItem>
                  <FormControl>
                    <>
                      <ImageUpload
                        onFileSelected={(file) => {
                          const reader = new FileReader();
                          reader.onloadend = function () {
                            setImagePreviewUrl(reader.result as string);
                          };
                          reader.readAsDataURL(file);
                          setImageToUpload(file);
                        }}
                      >
                        <div className="flex w-fit cursor-pointer flex-row rounded-md dark:bg-dark-4 md:px-[0.625rem] md:py-[0.25rem]">
                          <Icon.Image />
                          <p className="pl-[0.625rem] text-[0.563rem] dark:text-light-2 sm:text-[0.625rem] md:leading-[1.5rem]">
                            Set Cover
                          </p>
                        </div>
                      </ImageUpload>
                    </>
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
                    onOpenChange={handleGroupChange}
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
                                Select Group
                              </p>
                            </div>
                          }
                        />
                        {isGroupOpen ? (
                          <ChevronUp className="h-4 w-4 text-white opacity-50" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-white opacity-50" />
                        )}
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="z-50 cursor-pointer border-none text-[0.563rem] dark:bg-dark-3 dark:text-light-2 sm:text-[0.625rem] md:leading-[1.5rem]">
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
                    onOpenChange={handlePostChange}
                    value={String(field.value)}
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                  >
                    <FormControl>
                      <SelectTrigger className="flex min-w-[7rem] justify-between border-none p-0 px-3 text-[1rem] dark:bg-dark-4 dark:text-light-2">
                        <SelectValue
                          placeholder={
                            <div className="flex w-fit flex-row rounded-md px-[0.625rem] py-[0.25rem] dark:bg-dark-4">
                              <p className="text-[0.563rem] leading-[1.5rem] dark:text-light-2 sm:text-[0.625rem]">
                                Create Post
                              </p>
                            </div>
                          }
                        />
                        {isPostOpen ? (
                          <ChevronUp className="h-4 w-4 text-white opacity-50" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-white opacity-50" />
                        )}
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="z-50 cursor-pointer border-none text-[0.563rem] leading-[1.5rem] dark:bg-dark-3 dark:text-light-2 sm:text-[0.625rem]">
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
          <div className="flex items-center justify-center p-6">
            <Image
              src={imagePreviewUrl || "/christopher.png"}
              height={125}
              width={125}
              alt="image"
              className="rounded-md"
            />
          </div>
          <div className="relative flex flex-col py-[1.25rem]">
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
          <div className="pb-[1.25rem]">
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
                      className="bg-light-2 px-[1.25rem] py-[0.625rem] text-[1rem] dark:bg-dark-4 dark:text-light-2"
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
              className="rounded-md bg-blue px-[2.5rem] py-[0.625rem] text-[0.875rem] text-blue-10 md:text-[1rem] md:leading-[1.5rem]"
            />
            <CustomButton
              type="button"
              label="Cancel"
              className="rounded-md bg-dark-3 px-[2.5rem] py-[0.625rem] text-[0.875rem] text-sc-3 md:text-[1rem] md:leading-[1.5rem]"
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
