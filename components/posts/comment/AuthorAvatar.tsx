import Image from "next/image";
import { AuthorProps } from "@/types/posts";

const AuthorAvatar = ({ picture }: AuthorProps) => (
  <Image
    src={picture}
    alt="comment author image"
    width={40}
    height={40}
    className="rounded-full"
  />
);

export default AuthorAvatar;
