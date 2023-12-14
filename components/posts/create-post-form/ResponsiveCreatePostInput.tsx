import CreatePostInput from "@/components/home-page/CreatePostInput";
import { ResponsiveCreatePostInputProps } from "@/types/posts";

const ResponsiveCreatePostInput = ({
  userImage,
}: ResponsiveCreatePostInputProps) => (
  <>
    <div className="flex w-full lg:hidden">
      <CreatePostInput userImage={userImage} />
    </div>
    <div className="hidden w-full lg:flex">
      <CreatePostInput userImage={userImage} />
    </div>
  </>
);

export default ResponsiveCreatePostInput;
