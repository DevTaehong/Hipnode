import Image from "next/image";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import { CiFolderOn } from "react-icons/ci";

import FillIcon from "../icons/fill-icons";
import LiveChatAudioPlayer from "./LiveChatAudioPlayer";
import { AttachmentPreviewProps } from "@/types/chatroom.index";

const AttachmentPreview = ({
  setAttachmentPreview,
  setDroppedFile,
  attachmentPreview,
  mediaType,
}: AttachmentPreviewProps) => {
  return (
    <figure className="relative flex w-fit">
      <button
        className={`flex-center absolute right-0 top-0 h-5 w-5 bg-white/80 ${
          mediaType === "audio" ? "-right-5 -top-3" : "right-0 top-0"
        }`}
      >
        <IoClose
          className="z-10 cursor-pointer text-[20px]"
          onClick={() => {
            setAttachmentPreview(null);
            setDroppedFile(null);
          }}
        />
      </button>
      {mediaType === "image" && (
        <Image
          src={attachmentPreview}
          height={250}
          width={250}
          className="mb-3"
          alt="Image preview"
        />
      )}
      {mediaType === "video" && (
        <video
          src={attachmentPreview}
          height={250}
          width={250}
          className="mb-3 h-full max-h-[15rem] w-fit max-w-[18rem]"
          controls
        />
      )}
      {mediaType === "audio" && (
        <LiveChatAudioPlayer songUrl={attachmentPreview} />
      )}
      {mediaType === "document" && (
        <Link
          href={attachmentPreview}
          className="flex-center mb-3 h-40 w-40 rounded-xl bg-red-80"
        >
          <FillIcon.Post className="h-10 w-10 fill-white" />
        </Link>
      )}
      {mediaType === "folder" && (
        <div className="flex-center mb-3 h-40 w-40 rounded-xl bg-red-60">
          <CiFolderOn className="text-[50px] text-white" />
        </div>
      )}
    </figure>
  );
};

export default AttachmentPreview;
