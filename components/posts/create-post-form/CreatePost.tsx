"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { uploadImageToSupabase } from "@/utils/index";
import {
  CoverImageUpload,
  CreatePostButtons,
  CreatePostTags,
  CreatePostTitle,
  SelectController,
} from ".";
import { postFormValidationSchema } from "@/lib/validations";
import { PostFormValuesType } from "@/types/create-post-form/index";
import { POST, GROUP, POST_FORM_DEFAULT_VALUES } from "@/constants/index";
import { useCreatePostStore } from "@/app/lexicalStore";

const LexicalEditor = dynamic(
  () => import("@/components/lexical-editor/LexicalEditor"),
  { ssr: false }
);

const CreatePost = () => {
  const [imageToUpload, setImageToUpload] = useState<File | null>(null);

  const {
    imagePreviewUrl,
    setImagePreviewUrl,
    previewValues,
    setPreviewValues,
    setClearEditor,
  } = useCreatePostStore((state) => state);

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

  const form = useForm<PostFormValuesType>({
    resolver: zodResolver(postFormValidationSchema),
    mode: "onBlur",
    defaultValues: POST_FORM_DEFAULT_VALUES,
  });

  const { setValue, watch } = form;

  const onSubmit = async (values: PostFormValuesType) => {
    await handleUpload();
    setClearEditor(true);
    const finalValues = form.getValues();
    console.log(finalValues);
    form.reset();
  };

  const onSubmitPreview = async () => {
    const previewValues = form.getValues();
    setPreviewValues(previewValues);
  };

  const watchedData = watch();
  console.log(previewValues);
  useEffect(() => {
    console.log(watchedData);
  }, [watchedData]);

  return (
    <div className="flex max-w-[55rem] items-center justify-center rounded-md bg-light dark:bg-dark-3">
      <Form {...form}>
        <form
          action=""
          onSubmit={form.handleSubmit(onSubmit)}
          className="rounded-md p-[1.25rem] dark:bg-dark-3"
        >
          <div className="pb-[1.25rem]">
            <CreatePostTitle control={form.control} />
          </div>
          <div className="flex flex-col justify-between  sm:flex-row">
            <div className="flex flex-row items-center gap-4 dark:bg-dark-3">
              <CoverImageUpload
                control={form.control}
                setImagePreviewUrl={setImagePreviewUrl}
                setImageToUpload={setImageToUpload}
              />

              <SelectController
                control={form.control}
                name={"group"}
                placeholder={"Select Group"}
                options={GROUP}
              />

              <SelectController
                control={form.control}
                name={"post"}
                placeholder={"Create Post"}
                options={POST}
              />
            </div>
            <div className="mr-[1.25rem] mt-[1.25rem] flex max-w-[8rem] items-center justify-center rounded-md p-2 text-[1rem] dark:bg-dark-4 dark:text-light-2 sm:mt-0">
              <p className="text-[1rem] leading-[1.5rem] dark:text-light-2">
                Code of Conduct
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center">
            {imagePreviewUrl && (
              <div className="py-6">
                <Image
                  src={imagePreviewUrl || "/negan.png"}
                  height={125}
                  width={125}
                  alt="image"
                  className="rounded-md"
                />
              </div>
            )}
          </div>
          <div className="relative flex flex-col py-[1.25rem]">
            <div className="min-h-[22rem]">
              <FormField
                name="mainText"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <LexicalEditor
                        name="mainText"
                        updateField={setValue}
                        onSubmitPreview={onSubmitPreview}
                      />
                    </FormControl>
                    <FormMessage className="capitalize text-red-500" />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <CreatePostTags control={form.control} form={form} />
          <CreatePostButtons />
        </form>
      </Form>
    </div>
  );
};

export default CreatePost;
