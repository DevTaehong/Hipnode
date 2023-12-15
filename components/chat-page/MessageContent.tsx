import Link from "next/link";
import { useEffect, useState } from "react";

import { extractUrls, formatTextWithLineBreaks } from "../live-chat";
import { MessageContentProps } from "@/types/chatroom.index";
import LinkPreview from "./LinkPreview";

const MessageContent = ({
  additionalStyles,
  text,
  fontSize,
  inView,
}: MessageContentProps) => {
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (inView) {
      setTimeout(() => setShowPreview(true), 100);
    }
  }, [inView]);

  const handleMouseOver = () => {
    setShowPreview(true);
  };

  if (text === null) return null;

  const segments = text ? extractUrls(text) : [];
  const links = segments.length
    ? segments.filter((segment) => segment.isUrl)
    : [];

  return (
    <div className="flex flex-col gap-5">
      {showPreview &&
        links.map((link) => (
          <LinkPreview
            key={link.text}
            url={link.text}
            additionalStyles={additionalStyles}
          />
        ))}
      <figcaption
        onMouseOver={handleMouseOver}
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
