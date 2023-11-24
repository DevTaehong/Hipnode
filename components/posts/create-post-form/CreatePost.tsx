"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@clerk/nextjs";

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
import {
  PostFormValuesType,
  GroupsType,
  PostDataType,
  createPostFormType,
} from "@/types/posts/index";
import { useCreatePostStore } from "@/app/lexicalStore";
import { PostFormDefaultValues } from "@/constants/posts";
import { createPostWithTags } from "@/lib/actions/post.action";
import { getGroups } from "@/lib/actions/group.actions";
import { getUserByClerkId } from "@/lib/actions/user.actions";
import FillIcon from "@/components/icons/fill-icons";

const LexicalEditor = dynamic(
  () => import("@/components/lexical-editor/LexicalEditor"),
  { ssr: false }
);

const SelectionOptions = [
  { label: "Post", icon: <FillIcon.Post /> },
  { label: "Meetup", icon: <FillIcon.Calendar /> },
  { label: "Podcasts", icon: <FillIcon.Podcasts /> },
  { label: "Interviews", icon: <FillIcon.Interviews /> },
];

const CreatePost = () => {
  const [imageToUpload, setImageToUpload] = useState<File | null>(null);
  const [groups, setGroups] = useState<GroupsType[]>([]);

  const { user: clerkUser, isLoaded, isSignedIn } = useUser();
  const [userInfo, setUserInfo] = useState<{
    id: number;
  } | null>(null);

  useEffect(() => {
    (async () => {
      if (clerkUser) {
        const userFromDB = await getUserByClerkId(clerkUser.id);
        if (userFromDB) {
          setUserInfo({
            id: userFromDB.id,
          });
        }
      }
    })();
  }, [clerkUser]);

  useEffect(() => {
    (async () => {
      const fetchedGroups = await getGroups();
      const groupOptions = fetchedGroups?.map((group) => ({
        label: group.name,
        value: group.id,
      }));
      setGroups(groupOptions);
    })();
  }, []);

  const {
    imagePreviewUrl,
    setImagePreviewUrl,
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
      setValue("image", uploadedURL);
      return uploadedURL;
    }
  };

  const form = useForm<PostFormValuesType>({
    resolver: zodResolver(postFormValidationSchema),
    mode: "onBlur",
    defaultValues: PostFormDefaultValues,
  });

  const { setValue } = form;

  const onSubmitPreview = async () => {
    const previewValues = form.getValues();
    setPreviewValues(previewValues);
  };

  const valueOfGroup = (data: createPostFormType) => {
    const matchedGroup = groups.find((group) => group.label === data.group);
    return matchedGroup ? matchedGroup.value : 0;
  };

  const processForm: SubmitHandler<PostFormValuesType> = async (
    data: createPostFormType
  ): Promise<void> => {
    if (!isLoaded || !isSignedIn) return;

    const postImage = await handleUpload();

    const { contentType, tags, group, ...postData } = data;

    if (!userInfo?.id || !valueOfGroup(data) || !postImage) {
      throw new Error("Required data is missing");
    }

    const postDataWithAuthor: PostDataType = {
      ...postData,
      authorId: userInfo?.id,
      groupId: valueOfGroup(data),
      image: postImage,
      clerkId: clerkUser?.id,
    };

    try {
      await createPostWithTags(postDataWithAuthor, tags);
      setClearEditor(true);
      setValue("image", "");
      form.reset();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="flex max-w-[55rem] items-center justify-center rounded-md bg-light dark:bg-dark-3">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(processForm)}
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
                options={groups}
              />

              <SelectController
                control={form.control}
                name={"contentType"}
                placeholder={"Create Post"}
                options={SelectionOptions}
              />
            </div>
            <div className="mr-[1.25rem] mt-[1.25rem] flex max-w-[8rem] items-center justify-center rounded-md p-2 text-[1rem] dark:bg-dark-4 dark:text-light-2 sm:mt-0">
              <p className="text-[1rem] leading-[1.5rem] dark:text-light-2">
                Code of Conduct
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center">
            {imagePreviewUrl ? (
              <div className="py-[1.25rem]">
                <Image
                  src={imagePreviewUrl || "/negan.png"}
                  height={125}
                  width={125}
                  alt="image"
                  className="rounded-md"
                />
              </div>
            ) : (
              <div className="py-[1.25rem]" />
            )}
          </div>
          <div className="relative flex flex-col pb-[2.5rem]">
            <div className="min-h-[22rem]">
              <FormField
                name="content"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <LexicalEditor
                        name="content"
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
