import Link from "next/link";

import { extractUrls, formatTextWithLineBreaks } from "../live-chat";
import { MessageContentProps } from "@/types/chatroom.index";

const MessageContent = ({
  additionalStyles,
  text,
  fontSize,
}: MessageContentProps) => {
  return (
    <figcaption
      className={`${additionalStyles} relative flex w-fit max-w-full flex-col overflow-hidden rounded-b-lg`}
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
            className={`${fontSize} max-w-full break-words`}
            dangerouslySetInnerHTML={formatTextWithLineBreaks(segment.text)}
          />
        )
      )}
    </figcaption>
  );
};

export default MessageContent;
