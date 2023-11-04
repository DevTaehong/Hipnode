import Image from "next/image";
import { Input } from "@/components/ui/input";
import { CommentBoxProps } from "@/types/posts";

const CommentBox = ({ placeholder, value }: CommentBoxProps) => (
  <div className="flex items-center justify-center pb-[1.25rem] pr-[1.25rem]">
    <div className="flex items-center justify-center px-[1.25rem]">
      <Image src="/images/emoji_2.png" alt="emoji" width={40} height={40} />
    </div>
    <div className="flex grow rounded-[1.4rem] border border-solid border-sc-5 pr-[1.25rem]">
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        className="bg-transparent px-[0.938rem] py-[0.625rem] text-sc-5"
      />
      <Image
        src="/smiley.svg"
        alt="smiley"
        width={24}
        height={24}
        className="rounded-full"
      />
    </div>
  </div>
);

export default CommentBox;
