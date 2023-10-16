import Image from "next/image";

const SocialMediaIcon = () => (
  <figure className="flex h-[1.874rem] w-[1.875rem] items-center justify-center rounded-full bg-purple-10 p-2">
    <div className="h-[1.25rem] w-[1.25rem]">
      <Image
        src="/emoji-placeholder.png"
        alt="social-icon-placeholder"
        width={20}
        height={20}
      />
    </div>
    <figcaption className="sr-only">Social media profile image</figcaption>
  </figure>
);

export default SocialMediaIcon;
