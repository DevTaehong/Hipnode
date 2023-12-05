"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
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
import {
  createPostWithTags,
  getPostToEditById,
  updatePost,
} from "@/lib/actions/post.action";
import { getGroups } from "@/lib/actions/group.actions";
import { getUserByClerkId } from "@/lib/actions/user.actions";
import FillIcon, { FillIconProps } from "@/components/icons/fill-icons";

const LexicalEditor = dynamic(
  () => import("@/components/lexical-editor/LexicalEditor"),
  { ssr: false }
);

interface SelectionOption {
  label: string;
  icon: React.ComponentType<FillIconProps>;
}

type SelectionOptionsType = SelectionOption[];

const SelectionOptions: SelectionOptionsType = [
  { label: "Post", icon: FillIcon.Post },
  { label: "Meetup", icon: FillIcon.Calendar },
  { label: "Podcasts", icon: FillIcon.Podcasts },
  { label: "Interviews", icon: FillIcon.Interviews },
];

const CreatePost = () => {
  const [imageToUpload, setImageToUpload] = useState<File | null>(null);
  const [defaultContent, setDefaultContent] = useState("");
  const [postIdParams, setPostIdParams] = useState<number>(0);

  const [groups, setGroups] = useState<GroupsType[]>([]);
  const searchParams = useSearchParams();

  const title = searchParams.get("title");
  const postId = searchParams.get("id");

  useEffect(() => {
    if (title) {
      setValue("heading", title);
    } else if (postId) {
      setPostIdParams(+postId);
      (async () => {
        const postToEdit = await getPostToEditById(+postId);
        if (!postToEdit) return;
        const { heading, content, image, tags, group } = postToEdit;
        const matchingGroup = groups.find((g) => g.value === parseInt(group));

        setImagePreviewUrl(image);
        form.reset({
          heading,
          content,
          image,
          tags,
          contentType: "Post",
          group: matchingGroup?.label,
        });
        setDefaultContent(content);
      })();
    }
  }, [searchParams, groups]);

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
  }, [searchParams]);

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
  const currentFormSelection = form.watch("contentType");
  const currentGroup = form.watch("group");

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

    const { contentType, tags, group, postId, ...postData } = data;

    const postDataWithAuthor: PostDataType = {
      ...postData,
      authorId: userInfo?.id as number,
      groupId: valueOfGroup(data),
      image: postImage ?? "",
      clerkId: clerkUser?.id,
    };
    try {
      if (postIdParams) {
        await updatePost(postIdParams, postData, tags);
      } else {
        await createPostWithTags(postDataWithAuthor, tags);
      }

      setClearEditor(true);
      form.reset();
    } catch (error) {
      console.error("Error creating/updating post:", error);
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
            <div className="flex flex-row items-center gap-4 pt-2 dark:bg-dark-3">
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
                currentSelection={currentGroup}
              />

              <SelectController
                control={form.control}
                name={"contentType"}
                placeholder={"Create Post"}
                options={SelectionOptions}
                currentSelection={currentFormSelection}
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
                        defaultContent={defaultContent || "Working on it"}
                      />
                    </FormControl>
                    <FormMessage className="capitalize text-red-500" />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <CreatePostTags control={form.control} form={form} />
          <CreatePostButtons postId={postIdParams} />
        </form>
      </Form>
    </div>
  );
};

export default CreatePost;
