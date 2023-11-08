import Image from "next/image";
import CommentForm from "./CommentForm";

const CommentBox = () => (
  <div className="flex items-center justify-center pb-[1.25rem] pr-[1.25rem]">
    <div className="flex items-center justify-center px-[1.25rem]">
      <Image src="/images/emoji_2.png" alt="emoji" width={40} height={40} />
    </div>
    <div className="flex grow justify-between rounded-[1.4rem] border border-solid border-sc-5 pr-[1.25rem]">
      <CommentForm />
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
