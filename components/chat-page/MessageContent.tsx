import Link from "next/link";

import { extractUrls, formatTextWithLineBreaks } from "../live-chat";
import { MessageContentProps } from "@/types/chatroom.index";
import LinkPreview from "./LinkPreview";

const MessageContent = ({
  additionalStyles,
  text,
  fontSize,
  inView,
}: MessageContentProps) => {
  if (text === null) return null;

  const segments = text ? extractUrls(text) : [];
  const links = segments.length
    ? segments.filter((segment) => segment.isUrl)
    : [];

  return (
    <div className="flex flex-col gap-5">
      {inView &&
        links.map((link) => (
          <LinkPreview
            key={link.text}
            url={link.text}
            additionalStyles={additionalStyles}
          />
        ))}
      <figcaption
        className={`${additionalStyles}  flex w-fit max-w-full flex-col overflow-hidden rounded-b-lg`}
      >
        {extractUrls(text).map((segment, index) =>
          segment.isUrl ? (
            <Link
              key={segment.text}
              href={segment.text}
              target="_blank"
              rel="noopener noreferrer"
              className="line-clamp-3 hover:underline"
            >
              {segment.text}
            </Link>
          ) : (
            <span
              key={segment.text}
              className={`${fontSize} max-w-full break-words`}
              dangerouslySetInnerHTML={formatTextWithLineBreaks(segment.text)}
            />
          )
        )}
      </figcaption>
    </div>
  );
};

export default MessageContent;
