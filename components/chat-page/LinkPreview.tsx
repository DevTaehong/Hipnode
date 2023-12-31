import { useState, useEffect, memo, useMemo } from "react";
import Link from "next/link";

import { LinkPreviewProps, LinkPreviewMetadata } from "@/types/chatroom.index";
import { fetchMetadataServer } from "./fetchMetadata";
import { getStyling } from "../live-chat/chat-functions";

const LinkPreview = memo(({ url, smallChatBox = false }: LinkPreviewProps) => {
  const { outerDivStyles, imageDivStyles, imageStyles } = useMemo(() => {
    return getStyling(smallChatBox);
  }, [smallChatBox]);
  const [metadata, setMetadata] = useState<LinkPreviewMetadata>({
    title: null,
    image: null,
    description: null,
  });

  useEffect(() => {
    const fetchMetadata = async () => {
      const siteMetadata = await fetchMetadataServer(url);
      if (siteMetadata) {
        setMetadata({
          title: siteMetadata.title ?? null,
          image: siteMetadata.image ?? null,
          description: siteMetadata.description ?? null,
        });
      }
    };
    fetchMetadata();
  }, [url]);

  const { title, image, description } = metadata;

  if (!title || !image) return null;

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex w-full gap-2 rounded-lg hover:underline"
    >
      <div className={`${outerDivStyles} flex max-w-full flex-col`}>
        <div className={`flex ${imageDivStyles} shrink-0 rounded`}>
          <img
            src={image}
            className={`${imageStyles} w-full rounded object-contain`}
            alt={title || "Link preview image"}
          />
        </div>
        <div className="flex h-full w-full flex-col justify-between gap-1 overflow-hidden">
          <p className="semibold-16 md:semibold-18 line-clamp-2">{title}</p>
          <p className="base-12 md:base-14 line-clamp-2">{description}</p>
        </div>
      </div>
    </Link>
  );
});

LinkPreview.displayName = "LinkPreview";

export default LinkPreview;
