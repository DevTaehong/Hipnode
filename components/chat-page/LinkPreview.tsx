import { useState, useEffect, memo } from "react";
import Link from "next/link";

import { LinkPreviewProps, LinkPreviewMetadata } from "@/types/chatroom.index";
import { fetchMetadataServer } from "./fetchMetadata";

const LinkPreview = memo(
  ({ url, additionalStyles, smallChatBox = false }: LinkPreviewProps) => {
    console.log("render");
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
      linkStyles: smallChatBox ? "max-w-[250px] p-2.5" : "p-4",
      imageDivStyles: smallChatBox
        ? "max-h-[5.3rem] max-w-[5.3rem]"
        : "max-h-[7rem] max-w-[7rem]",
      imageStyles: smallChatBox ? "w-[5.3rem]" : "w-[7rem]",
      titleStyles: smallChatBox
        ? "semibold-12 md:semibold-14"
        : "semibold-14 md:semibold-18",
      descriptionStyles: smallChatBox
        ? "semibold-10 md:semibold-12"
        : "semibold-12 md:semibold-14",
    };

    const {
      linkStyles,
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
        className={`${linkStyles} flex w-full gap-2 rounded-lg hover:underline ${additionalStyles}`}
      >
        <div className="flex max-w-full gap-3">
          <div className={`flex ${imageDivStyles}  shrink-0 rounded bg-white`}>
            <img
              src={image}
              className={`${imageStyles} rounded object-contain`}
              alt="link image"
            />
          </div>
          <div className="flex h-full w-full flex-col justify-between gap-1 overflow-hidden">
            <p className={`${titleStyles}  line-clamp-2`}>{title}</p>
            <p className={`${descriptionStyles}  line-clamp-2`}>
              {description}
            </p>
          </div>
        </div>
      </Link>
    );
  }
);

LinkPreview.displayName = "LinkPreview";

export default LinkPreview;
