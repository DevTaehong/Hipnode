import Image from "next/image";
import CustomButton from "./CustomButton";
import FillIcon from "./icons/fill-icons";
import { IconAlt, SocialIcon } from "./icons/outline-icons";

// TODO - use live data to populate

const srcArray = [
  "/emoji_2.png",
  "/emoji_2.png",
  "/emoji_2.png",
  "/emoji_2.png",
  "/emoji_2.png",
  "/emoji_2.png",
  "/emoji_2.png",
  "/emoji_2.png",
];

const ProfileModal = () => {
  return (
    <div className="relative flex max-w-[20.938rem] flex-col items-center rounded-2xl bg-light p-5 dark:bg-dark-3">
      <div className="absolute left-0 top-0 flex h-[6.25rem] w-full rounded-t-2xl bg-profile-modal bg-no-repeat" />
      <div className="z-20 mt-4">
        <div className="flex h-[8.125rem] w-[8.125rem] items-center justify-center rounded-full border-[0.19rem] border-dark-3 bg-yellow-30">
          <div className="h-[6.25rem] w-[6.25rem] pb-[0.625rem]">
            <Image src="/emoji_2.png" alt="emoji" width={100} height={100} />
          </div>
        </div>
      </div>
      <p className="text-[1.625rem] font-semibold leading-[2.375rem] text-sc-2 dark:text-light">
        AR. Jakir
      </p>
      <p className="pb-[1.25rem] font-normal leading-[1.5rem] text-sc-3">
        User Interface Design
      </p>
      <div className="flex items-center justify-center gap-[0.625rem]  pb-[1.25rem]">
        <CustomButton
          label="Follow"
          className="w-[7.75rem] bg-blue p-[0.375rem] font-semibold leading-[1.5rem] text-light"
        />
        <div className="grid h-[2.25rem] w-[2.25rem] place-items-center rounded-lg  bg-blue-10 dark:bg-dark-4">
          <FillIcon.Message className="fill-blue" />
        </div>
      </div>
      <p className="pb-[1.25rem] text-center font-[0.875rem] leading-[1.375rem] text-purple-black-20 dark:text-light-3">
        333 Followers
        <span className="relative top-[-0.125rem] px-1 text-[2rem]">.</span>
        501 Points
      </p>
      <p className="pb-[1.25rem] font-[0.875rem] leading-[1.375rem] text-purple-black-20 dark:text-light-3">
        Following 47
      </p>
      <div className="flex flex-wrap justify-center gap-[0.625rem] pb-[1.25rem] ">
        {srcArray.slice(0, 6).map((src, index) => (
          <div
            className="h-[1.875rem] w-[1.875rem] rounded-full bg-blue-10"
            key={src + index}
          >
            <Image src={src} alt="emoji" width={100} height={100} />
          </div>
        ))}
        {srcArray.length > 6 && (
          <div className="flex h-[1.875rem] w-[1.875rem] items-center justify-center rounded-full bg-blue-10">
            {srcArray.length} +{" "}
          </div>
        )}
      </div>

      <p className="pb-[1.25rem] text-center font-[0.875rem] leading-[1.375rem] text-sc-3">
        Hey there...I&apos;m AR Jakir! I&apos;m here to learn from and support
        the other members of the community!
      </p>
      <div className="flex flex-col items-center px-[1.25rem] pb-[1.25rem]">
        <div className="flex pb-[1.25rem]">
          <div className="mr-[0.625rem]">
            <IconAlt.Web className="h-[0.875rem] w-[0.875rem] fill-sc-2 dark:fill-light-3" />
          </div>
          <p className="text-[0.875rem] font-semibold leading-[1.375rem] text-sc-2 dark:text-sc-6">
            www.uikit.to
          </p>
        </div>
        <div className="flex gap-2.5">
          <SocialIcon.Twitter className="fill-sc-4 dark:fill-light-3" />
          <SocialIcon.Facebook className="fill-sc-4 dark:fill-light-3" />
          <SocialIcon.Instagram className="fill-sc-4 dark:fill-light-3" />
        </div>
      </div>
      <div className="h-[0.063rem] w-[10.625rem] bg-sc-6 dark:bg-sc-3" />
      <p className="pb-[1.875rem] pt-[1.25rem] text-[0.875rem] font-semibold leading-[1.375rem] text-sc-3 dark:text-sc-6 ">
        joined 2 years ago
      </p>
    </div>
  );
};

export default ProfileModal;
