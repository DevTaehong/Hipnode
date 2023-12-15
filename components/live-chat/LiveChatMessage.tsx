import Image from "next/image";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

import MessageAttachment from "./MessageAttachment";
import useChatStore from "@/app/chatStore";
import { ChatMessage } from "@/types/chatroom.index";
import { isOnlyEmoji, extractUrls, formatTextWithLineBreaks } from ".";
import LinkPreview from "../chat-page/LinkPreview";

const LiveChatMessage = ({ message }: { message: ChatMessage }) => {
  const { chatroomUsers } = useChatStore();

  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  const {
    user: { id, image, username },
    text,
  } = message.data;

  const segments = text ? extractUrls(text) : [];
  const links = segments.length
    ? segments.filter((segment) => segment.isUrl)
    : [];

  const isStringSingleEmoji = text ? isOnlyEmoji(text) : false;

  const textFontSize = isStringSingleEmoji ? "text-5xl" : "regular-16 ";

  const currentUserId = chatroomUsers[0].id;

  const isMessageFromCurrentUser = id === currentUserId;

  const calculateDivStyles = () => {
    if (isStringSingleEmoji) {
      return `bg-none p-1 ${isMessageFromCurrentUser ? "self-end" : ""}`;
    }
    return isMessageFromCurrentUser
      ? "bg-red-80 text-white rounded-l-lg rounded-tr-sm p-2.5"
      : "bg-red-10 text-red-80 rounded-r-lg rounded-tl-sm p-2.5";
  };

  const messageAlign = isMessageFromCurrentUser
    ? "self-end flex-row-reverse"
    : "self-start flex-row";

  return (
    <li
      ref={ref}
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
      <div className="flex flex-col gap-3">
        <figure className={`flex w-fit max-w-[250px] flex-col gap-3`}>
          <MessageAttachment
            message={message}
            isMessageFromCurrentUser={isMessageFromCurrentUser}
          />
          {text && (
            <figcaption
              className={`${calculateDivStyles()} ${
                isMessageFromCurrentUser && "self-end"
              } flex w-fit max-w-full flex-col gap-2 overflow-hidden rounded-b-lg`}
            >
              {inView &&
                links.map((link) => (
                  <LinkPreview key={link.text} url={link.text} smallChatBox />
                ))}
              {extractUrls(text).map((segment, index) =>
                segment.isUrl ? (
                  <Link
                    key={index}
                    href={segment.text}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="semibold-16 line-clamp-3 hover:underline"
                  >
                    {segment.text}
                  </Link>
                ) : (
                  <span
                    key={index}
                    className={`${textFontSize} semibold-16 max-w-full break-words`}
                    dangerouslySetInnerHTML={formatTextWithLineBreaks(
                      segment.text
                    )}
                  />
                )
              )}
            </figcaption>
          )}
        </figure>
      </div>
    </li>
  );
};

export default LiveChatMessage;
