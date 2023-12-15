import { useState, useEffect, memo } from "react";
import Link from "next/link";

import { LinkPreviewProps, LinkPreviewMetadata } from "@/types/chatroom.index";
import { fetchMetadataServer } from "./fetchMetadata";

const LinkPreview = memo(({ url, smallChatBox = false }: LinkPreviewProps) => {
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

  const styling = {
    outerDivStyles: smallChatBox
      ? "gap-1"
      : "gap-3 xs:flex-row md:flex-col lg:flex-row",
    imageDivStyles: smallChatBox
      ? "w-full max-h-[7rem]"
      : "xs:max-h-[7rem] xs:max-w-[8.2rem] md:max-w-full md:max-h-[18rem]  lg:max-h-[7rem] lg:max-w-[8.2rem]",
    imageStyles:
      !smallChatBox && "w-full xs:w-[8.2rem] md:w-full lg:w-[8.2rem]",
    titleStyles: smallChatBox
      ? "semibold-14 md:semibold-18"
      : "semibold-16 md:semibold-18",
    descriptionStyles: smallChatBox
      ? "base-12 md:base-14"
      : "base-12 md:base-14",
  };

  const {
    outerDivStyles,
    imageDivStyles,
    imageStyles,
    titleStyles,
    descriptionStyles,
  } = styling;

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
            className={`${imageStyles} w-full rounded object-cover`}
            alt="link image"
          />
        </div>
        <div className="flex h-full w-full flex-col justify-between gap-1 overflow-hidden">
          <p className={`${titleStyles} line-clamp-2`}>{title}</p>
          <p className={`${descriptionStyles} line-clamp-2`}>{description}</p>
        </div>
      </div>
    </Link>
  );
});

LinkPreview.displayName = "LinkPreview";

export default LinkPreview;
