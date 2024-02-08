"use client";

import DOMPurify from "isomorphic-dompurify";

interface SanatizedHtmlProps {
  content: string;
  className?: string;
}

const SanatizedHtml = ({ content, className }: SanatizedHtmlProps) => {
  function cleanString(inputString: string) {
    let result = inputString.replace(/^['"]|['"]$/g, "");
    result = result.replace(/\\"/g, '"');
    return DOMPurify.sanitize(result);
  }

  const contentToDisplay = cleanString(content);

  return (
    <p
      className={className}
      dangerouslySetInnerHTML={{ __html: contentToDisplay }}
    />
  );
};

export default SanatizedHtml;
