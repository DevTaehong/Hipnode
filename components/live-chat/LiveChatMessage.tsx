import Image from "next/image";
import Link from "next/link";

import MessageAttachment from "./MessageAttachment";
import useChatStore from "@/app/chatStore";
import { ChatMessage } from "@/types/chatroom.index";
import { isOnlyEmoji, extractUrls, formatTextWithLineBreaks } from ".";

const LiveChatMessage = ({ message }: { message: ChatMessage }) => {
  const { chatroomUsers } = useChatStore();

  const {
    user: { id, image, username },
    text,
  } = message.data;

  const isStringSingleEmoji = text ? isOnlyEmoji(text) : false;

  const textFontSize = isStringSingleEmoji ? "text-5xl" : "regular-16 ";

  const currentUserId = chatroomUsers[0].id;

  const isMessageFromCurrentUser = id === currentUserId;

  const calculateDivStyles = () => {
    if (isStringSingleEmoji) {
      return `bg-none p-1 ${isMessageFromCurrentUser ? "self-end" : ""}`;
    }
    return isMessageFromCurrentUser
      ? "bg-red-80 text-white rounded-l-lg rounded-tr-sm p-3.5"
      : "bg-red-10 text-red-80 rounded-r-lg rounded-tl-sm p-3.5";
  };

  const messageAlign = isMessageFromCurrentUser
    ? "self-end flex-row-reverse"
    : "self-start flex-row";

  return (
    <li
      className={`${messageAlign} flex max-w-full gap-2.5 break-words`}
      key={id}
    >
      <figure className="flex h-10 max-h-[2.5rem] min-h-[2.5rem] w-10 min-w-[2.5rem] max-w-[2.5rem]">
        <Image
          src={image}
          alt={`Profile image for ${username}`}
          height={40}
          width={40}
          className="rounded-full"
        />
      </figure>
      <figure className="flex w-fit max-w-[250px] flex-col gap-3">
        <MessageAttachment
          message={message}
          isMessageFromCurrentUser={isMessageFromCurrentUser}
        />
        {text && (
          <figcaption
            className={`${calculateDivStyles()} semibold-16 flex w-fit max-w-full flex-col overflow-hidden rounded-b-lg`}
          >
            {extractUrls(text).map((segment, index) =>
              segment.isUrl ? (
                <Link
                  key={index}
                  href={segment.text}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  {segment.text}
                </Link>
              ) : (
                <span
                  key={index}
                  className={`${textFontSize} max-w-full break-words`}
                  dangerouslySetInnerHTML={formatTextWithLineBreaks(
                    segment.text
                  )}
                />
              )
            )}
          </figcaption>
        )}
      </figure>
    </li>
  );
};

export default LiveChatMessage;
