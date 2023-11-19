"use client";

import DOMPurify from "isomorphic-dompurify";

interface SanatisedStringProps {
  content: string;
}

const SanatisedString = ({ content }: SanatisedStringProps) => {
  function cleanString(inputString: string) {
    let result = inputString.replace(/^['"]|['"]$/g, "");
    result = result.replace(/\\"/g, '"');
    return DOMPurify.sanitize(result);
  }

  const contentToDisplay = cleanString(content);

  return <div dangerouslySetInnerHTML={{ __html: contentToDisplay }} />;
};

export default SanatisedString;
