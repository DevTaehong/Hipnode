import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  resetheight: number;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, resetheight) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    React.useEffect(() => {
      const adjustHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
          textarea.style.height = "22px";

          textarea.style.height = `${textarea.scrollHeight}px`;
        }
      };

      adjustHeight();

      textareaRef.current?.addEventListener("input", adjustHeight);

      return () => {
        textareaRef.current?.removeEventListener("input", adjustHeight);
      };
    }, [resetheight]);

    return (
      <textarea
        ref={textareaRef}
        className={cn("flex  w-full", className)}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
