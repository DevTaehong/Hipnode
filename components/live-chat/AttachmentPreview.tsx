import Image from "next/image";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import { CiFolderOn } from "react-icons/ci";

import FillIcon from "../icons/fill-icons";
import LiveChatAudioPlayer from "./LiveChatAudioPlayer";
import {
  AttachmentPreviewProps,
  RenderPreviewProps,
} from "@/types/chatroom.index";
import { getMediaType } from "@/utils";
import { useMemo } from "react";

const RenderPreview = ({
  mediaType,
  attachmentPreview,
}: RenderPreviewProps) => {
  switch (mediaType) {
    case "image":
      return (
        <Image
          src={attachmentPreview}
          height={250}
          width={250}
          className="mb-3"
          alt="Image preview"
        />
      );
    case "video":
      return (
        <video
          src={attachmentPreview}
          height={250}
          width={250}
          className="mb-3 h-full max-h-[15rem] w-fit max-w-[18rem]"
          controls
        />
      );
    case "audio":
      return <LiveChatAudioPlayer songUrl={attachmentPreview} />;
    case "document":
      return (
        <Link
          href={attachmentPreview}
          className="flex-center mb-3 h-40 w-40 rounded-xl bg-red-80"
        >
          <FillIcon.Post className="h-10 w-10 fill-white" />
        </Link>
      );
    case "folder":
      return (
        <div className="flex-center mb-3 h-40 w-40 rounded-xl bg-red-60">
          <CiFolderOn className="text-[50px] text-white" />
        </div>
      );
    default:
      return null;
  }
};

const AttachmentPreview = ({
  droppedFile,
  setDroppedFile,
}: AttachmentPreviewProps) => {
  const mediaType = getMediaType(droppedFile);

  const previewUrl = useMemo(() => {
    if (droppedFile) {
      const file = Array.isArray(droppedFile) ? droppedFile[0] : droppedFile;
      return URL.createObjectURL(file);
    }
    return null;
  }, [droppedFile]);

  return (
    <figure className="relative flex w-fit">
      <button
        className={`flex-center absolute right-0 top-0 h-5 w-5 bg-white/80 ${
          mediaType === "audio" ? "-right-5 -top-3" : "right-0 top-0"
        }`}
        onClick={() => {
          setDroppedFile(null);
        }}
      >
        <IoClose className="z-10 cursor-pointer text-[20px]" />
      </button>
      {previewUrl && (
        <RenderPreview mediaType={mediaType} attachmentPreview={previewUrl} />
      )}
    </figure>
  );
};

export default AttachmentPreview;
