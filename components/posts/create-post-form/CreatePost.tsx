"use client";

import React, { useEffect, useState } from "react";
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
import LexicalEditor from "@/components/lexical-editor/LexicalEditor";
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

export default function CreatePost() {
  // const [htmlString, setHtmlString] = useState("");
  const [imageToUpload, setImageToUpload] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [previewValues, setPreviewValues] = useState<PostFormValuesType | null>(
    null
  );
  const [clearEditor, setClearEditor] = useState(false);

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
    const finalValues = form.getValues();
    console.log(finalValues);
    setClearEditor(true);
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
          <div className="flex items-center justify-center p-6">
            <Image
              src={imagePreviewUrl || "/emoji_2.png"}
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
                      <LexicalEditor
                        name="mainText"
                        updateField={setValue}
                        imagePreviewUrl={imagePreviewUrl || "/emoji_2.png"}
                        onSubmitPreview={onSubmitPreview}
                        previewValues={
                          previewValues || POST_FORM_DEFAULT_VALUES
                        }
                        clearEditor={clearEditor}
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
}
