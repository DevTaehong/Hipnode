"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CreatableSelect from "react-select/creatable";
import { useToast } from "@/components/ui/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { uploadImageToSupabase } from "@/utils/index";
import {
  CoverImageUpload,
  CreatePostButtons,
  CreatePostTags,
  SelectController,
  GenericInput,
} from ".";

import {
  CreatePostProps,
  InterviewDataType,
  MeetUpDataType,
  PostDataType,
  SelectionOptionsType,
} from "@/types/posts/index";
import {
  POST_TYPE,
  PostFormDefaultValues,
  PostFormValuesType,
  dynamicPostValidation,
  interviewInputFields,
  meetupInputFields,
} from "@/constants/posts";
import { createPostWithTags, updatePost } from "@/lib/actions/post.action";

import FillIcon from "@/components/icons/fill-icons";
import PodcastUpload from "./PodcastUpload";
import { createPodcast, updatePodcast } from "@/lib/actions/podcast.actions";
import LiveChatAudioPlayer from "@/components/live-chat/LiveChatAudioPlayer";
import { createShow } from "@/lib/actions/show.actions";
import GroupPopover from "./GroupPopover";
import {
  createMeetUpWithTags,
  updateMeetup,
} from "@/lib/actions/meetup.actions";

import {
  createInterviewWithTags,
  updateInterview,
} from "@/lib/actions/interview.actions";
import { useCreatePostContext } from "@/app/contexts/CreatePostContext";
import { initialConfig } from "@/constants/lexical-editor";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { fetchAndSetFormData } from "./utils";
import FormLoader from "./FormLoader";

import Location from "./Location";

const LexicalEditor = dynamic(
  () => import("@/components/lexical-editor/LexicalEditor"),
  { ssr: false }
);

const SelectionOptions: SelectionOptionsType = [
  { label: "Post", icon: FillIcon.Post },
  { label: "Meetup", icon: FillIcon.Calendar },
  { label: "Podcast", icon: FillIcon.Podcasts },
  { label: "Interview", icon: FillIcon.Interviews },
];

const CreatePost = ({
  shows,
  groups,
  fastestGrowingGroups,
  mostPopularGroups,
  newlyLaunchedGroups,
}: CreatePostProps) => {
  const { toast } = useToast();
  const [imageToUpload, setImageToUpload] = useState<File | null>(null);
  const [podcastToUpload, setPodcastToUpload] = useState<File | null>(null);
  const [defaultContent, setDefaultContent] = useState("");
  const [contentType, setContentType] = useState<string>(POST_TYPE.POST);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const mediaId =
    searchParams.get("id") !== null ? Number(searchParams.get("id")) : null;
  const mediaType = searchParams.get("media");

  const {
    imagePreviewUrl,
    podcastPreviewUrl,
    setImagePreviewUrl,
    setPodcastPreviewUrl,
    setPreviewValues,
    setClearEditor,
  } = useCreatePostContext();

  const handleUpload = async () => {
    let imagesFromSupabase, podcastURL;

    if (imageToUpload) {
      const imageBucket =
        contentType === POST_TYPE.PODCAST ? "podcast-images" : "posts";
      imagesFromSupabase = await uploadImageToSupabase(
        imageToUpload,
        imageBucket,
        "images"
      );

      setValue("image", imagesFromSupabase?.mainImageURL || "");
    }
    if (contentType === POST_TYPE.PODCAST && podcastToUpload) {
      await uploadImageToSupabase(podcastToUpload, "podcasts");
    }

    return {
      mainImage: imagesFromSupabase?.mainImageURL || "",
      blurImage: imagesFromSupabase?.blurImageURL || "",
      podcastURL: podcastURL || "",
      imageWidth: imagesFromSupabase?.imageWidth,
      imageHeight: imagesFromSupabase?.imageHeight,
    };
  };

  const form = useForm<PostFormValuesType>({
    resolver: zodResolver(dynamicPostValidation),
    mode: "onBlur",
    defaultValues: PostFormDefaultValues,
  });

  useEffect(() => {
    if (title) {
      setValue("heading", title);
    }
    fetchAndSetFormData({
      mediaId,
      mediaType,
      setImagePreviewUrl,
      setDefaultContent,
      form,
    });
  }, [title, mediaId, mediaType]);

  const contentTypeWatched = form.watch("contentType");
  const currentGroup = form.watch("group");
  const { setValue, formState } = form;
  const { errors } = formState;

  useEffect(() => {
    const message = Object.values(errors);

    if (message.length > 0) {
      toast({
        description: "Fill in required fields....",
        variant: "formFieldsFill",
      });
    }
  }, [errors]);

  useEffect(() => {
    setValue("image", imagePreviewUrl || "");
    if (contentType === POST_TYPE.PODCAST) {
      setValue("podcast", podcastPreviewUrl || "");
    }
  }, [imagePreviewUrl, podcastPreviewUrl]);

  useEffect(() => {
    setContentType(contentTypeWatched);
  }, [contentTypeWatched]);

  const onSubmitPreview = async () => {
    const previewValues = form.getValues();
    setPreviewValues(previewValues);
  };

  const valueOfGroup = (data: PostFormValuesType) => {
    const matchedGroup = groups.find((group) => group.label === data.group);

    return matchedGroup ? matchedGroup.value : 0;
  };

  const processForm: SubmitHandler<PostFormValuesType> = async (
    data: PostFormValuesType
  ) => {
    try {
      setIsLoading(true);

      const { imageWidth, imageHeight, mainImage, blurImage } =
        await handleUpload();

      const {
        websiteLink,
        salary,
        salaryPeriod,
        updates,
        contentType,
        tags,
        group,
        show,
        podcast,
        contactEmail,
        contactNumber,
        location,
        ...postData
      } = data;

      switch (contentType) {
        case POST_TYPE.PODCAST: {
          if (!show) {
            console.error(
              "Podcast & show are required for creating a podcast."
            );
            return;
          }
          let newShowId = null;
          if (show.__isNew__) {
            const newShow = await createShow({
              name: show.label,
            });
            newShowId = newShow.id;
          }
          const podcastData = {
            title: postData.heading,
            details: postData.content,
            image: imagePreviewUrl || mainImage || "",
            url: podcastPreviewUrl || "",
            showId: Number(newShowId) || Number(show.value),
            contentType: POST_TYPE.PODCAST,
          };
          if (mediaId) {
            await updatePodcast(mediaId, {
              ...podcastData,
              showId: Number(newShowId) || Number(show.value),
              url: podcastPreviewUrl || "",
            });
          } else {
            await createPodcast(podcastData);
          }

          break;
        }
        case POST_TYPE.POST: {
          const postDataWithAuthor: PostDataType = {
            ...postData,
            groupId: valueOfGroup(data),
            image: imagePreviewUrl || "",
            contentType: POST_TYPE.POST,
            blurImage: blurImage || "",
            imageWidth: imageWidth || 0,
            imageHeight: imageHeight || 0,
          };

          if (mediaId) {
            await updatePost(mediaId, postDataWithAuthor, tags ?? []);
          } else {
            await createPostWithTags(postDataWithAuthor, tags ?? []);
          }
          break;
        }

        case POST_TYPE.MEETUP: {
          const meetupData: MeetUpDataType = {
            contactEmail: contactEmail ?? "",
            contactNumber: contactNumber ?? "",
            image: imagePreviewUrl ?? "",
            contentType: POST_TYPE.MEETUP,
            location: location ?? "",
            summary: postData.content,
            title: postData.heading,
          };
          if (mediaId) {
            await updateMeetup(mediaId, meetupData, tags ?? []);
          } else {
            await createMeetUpWithTags(meetupData, tags ?? []);
          }
          break;
        }
        case POST_TYPE.INTERVIEW: {
          const interviewData: InterviewDataType = {
            title: postData.heading,
            contentType: POST_TYPE.INTERVIEW,
            bannerImage: imagePreviewUrl ?? "",
            details: postData.content,
            websiteLink: websiteLink ?? "",
            salary: +(salary ?? 0),
            salaryPeriod: salaryPeriod ?? "",
            updates: +(updates ?? 0),
          };

          if (mediaId) {
            await updateInterview(mediaId, interviewData, tags ?? []);
          } else {
            await createInterviewWithTags(interviewData, tags ?? []);
          }
          break;
        }
        default:
          console.error("Unhandled content type");
          return;
      }

      setClearEditor(true);
      form.reset();
    } catch (error) {
      console.error("Error creating/updating content:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <FormLoader messageText="Loading your media content..." />
      </div>
    );
  }
  return (
    <div className="mt-5 flex w-full max-w-[55rem] items-center justify-center rounded-md bg-light dark:bg-dark-3 md:mt-0">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(processForm)}
          className="w-full rounded-md p-[1.25rem] dark:bg-dark-3"
        >
          <div className="pb-[1.25rem]">
            <GenericInput
              control={form.control}
              name="heading"
              placeholder="Title...."
              className="rounded-lg px-[1.25rem] py-[0.7rem] text-[1.625rem] font-bold leading-[2.365rem] text-sc-1 outline-none dark:text-light-2"
            />
          </div>
          <div className="flex flex-wrap gap-4 bg-light pb-[1.25rem] dark:bg-dark-3">
            <CoverImageUpload
              control={form.control}
              setImagePreviewUrl={setImagePreviewUrl}
              setImageToUpload={setImageToUpload}
            />

            {contentType === POST_TYPE.PODCAST && (
              <PodcastUpload
                control={form.control}
                setPodcastPreviewUrl={setPodcastPreviewUrl}
                setPodcastToUpload={setPodcastToUpload}
              />
            )}

            {contentType === POST_TYPE.POST && (
              <GroupPopover
                currentGroup={currentGroup}
                fastestGrowingGroups={fastestGrowingGroups}
                mostPopularGroups={mostPopularGroups}
                newlyLaunchedGroups={newlyLaunchedGroups}
                setValue={setValue}
              />
            )}

            <SelectController
              control={form.control}
              name={"contentType"}
              placeholder={"Create Post"}
              options={SelectionOptions}
              currentSelection={contentType}
            />
          </div>
          <div className="flex items-center justify-center">
            {imagePreviewUrl && (
              <div className="flex max-h-[17rem] w-full justify-center pb-[2.5rem]">
                <Image
                  src={imagePreviewUrl}
                  alt="post-image"
                  width={335}
                  height={117}
                  className="w-full rounded-md object-cover"
                />
              </div>
            )}
          </div>
          {contentType === POST_TYPE.PODCAST && (
            <>
              <div className="flex translate-y-[-0.625rem] items-center justify-center pb-3 pt-1">
                {podcastPreviewUrl ? (
                  <LiveChatAudioPlayer audioUrl={podcastPreviewUrl} />
                ) : (
                  <>
                    <h3 className=" text-light-2" />
                  </>
                )}
              </div>
            </>
          )}
          <div className="relative flex flex-col">
            <div className="min-h-[22rem]">
              <FormField
                name="content"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <LexicalComposer initialConfig={initialConfig}>
                        <LexicalEditor
                          name="content"
                          updateField={setValue}
                          onSubmitPreview={onSubmitPreview}
                          defaultContent={defaultContent}
                        />
                      </LexicalComposer>
                    </FormControl>
                    <FormMessage className="capitalize text-red-80" />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {contentType === POST_TYPE.PODCAST ? (
            <>
              <FormLabel className="text-sc-2 dark:text-light-2">
                Category
              </FormLabel>
              <Controller
                name="show"
                control={form.control}
                render={({ field }) => (
                  <CreatableSelect
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: state.isFocused ? "white" : "",
                        backgroundColor: "bg-light-3 dark:bg-dark-4",
                        marginTop: "0.4rem",
                        padding: "0.2rem",
                      }),
                    }}
                    {...field}
                    isClearable
                    value={field.name === "show" ? field.value : null}
                    options={shows.map((option) => ({
                      ...option,
                      value: option.value.toString(),
                    }))}
                    onChange={(value) => field.onChange(value)}
                    placeholder="Select or create a show"
                  />
                )}
              />
            </>
          ) : null}

          {contentType === POST_TYPE.INTERVIEW && (
            <>
              <div className="flex flex-row justify-between gap-4 pt-5 text-sc-2 dark:text-light-2">
                {interviewInputFields.slice(0, 2).map((field) => (
                  <GenericInput
                    key={field.name}
                    control={form.control}
                    placeholder={field.placeholder}
                    name={field.name}
                    label={field.label}
                    type={field.type}
                  />
                ))}
              </div>
              <div className="flex flex-row justify-between gap-4 pt-5 text-sc-2 dark:text-light-2">
                {interviewInputFields.slice(2).map((field) => (
                  <GenericInput
                    key={field.name}
                    control={form.control}
                    placeholder={field.placeholder}
                    name={field.name}
                    label={field.label}
                    type={field.type}
                  />
                ))}
              </div>
            </>
          )}
          {contentType === POST_TYPE.MEETUP && (
            <>
              <div className="flex flex-row justify-between gap-4 pt-5 text-sc-2 dark:text-light-2">
                {meetupInputFields.map((field) => (
                  <GenericInput
                    key={field.name}
                    control={form.control}
                    placeholder={field.placeholder}
                    name={field.name}
                    label={field.label}
                    type={field.type}
                  />
                ))}
                <Location setValueHookForm={setValue} />
              </div>
            </>
          )}
          {contentType !== POST_TYPE.PODCAST && (
            <div className="flex w-full py-[1.25rem]">
              <CreatePostTags
                control={form.control}
                form={form}
                contentType={contentType}
              />
            </div>
          )}

          <div className="flex justify-between pt-4">
            <CreatePostButtons mediaId={mediaId} />
            <p className="flex max-w-[8rem] items-center justify-center rounded-md p-2 text-[0.563rem] dark:bg-dark-4 dark:text-light-2 sm:mt-0 sm:text-[0.875rem] md:leading-[1.375rem]">
              Code of Conduct
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreatePost;
