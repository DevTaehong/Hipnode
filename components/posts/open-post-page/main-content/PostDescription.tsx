import { PostDescriptionProps } from "@/types/posts";
import DOMPurify from "dompurify";
import { useState, useEffect } from "react";

const PostDescription = ({ description }: PostDescriptionProps) => {
  const [htmlString, setHtmlString] = useState("");

  function convertStringFormat(incorrectString: string) {
    if (incorrectString.startsWith('"') && incorrectString.endsWith('"')) {
      incorrectString = incorrectString.substring(
        1,
        incorrectString.length - 1
      );
    }
    incorrectString = incorrectString.replace(/\\&quot;/g, " ");
    return incorrectString;
  }

  useEffect(() => {
    const sanitizedHtml = DOMPurify.sanitize(description);
    setHtmlString(convertStringFormat(sanitizedHtml));
  }, [description]);
  return (
    <p className="pb-[1.875rem] pl-[4.8rem] pr-[1.25rem] text-[1rem] leading-[1.625rem]  text-sc-3 lg:pb-[2.5rem]">
      <div
        dangerouslySetInnerHTML={{
          __html: htmlString,
        }}
      />
    </p>
  );
};

export default PostDescription;
