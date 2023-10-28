import Image from "next/image";
import Link from "next/link";

import ProfileBtns from "./ProfileBtns";
import OutlineIcon from "../icons/outline-icons";

import { ProfileInfoProps } from "@/types";

const ProfileModal = ({
  src,
  name,
  title,
  followers,
  points,
  following,
  description,
  website,
  socials,
  joinedAt,
}: ProfileInfoProps) => {
  return (
    <div className="relative flex flex-col items-center rounded-2xl bg-white p-5 dark:bg-dark-3">
      {/* Orange background image with absolute positioning */}
      <div className="absolute left-0 top-0 h-[6.50rem] w-full rounded-t-2xl bg-profile-modal bg-cover bg-center bg-no-repeat" />

      {/* Profile Image that changes the border color for light/dark mode */}
      <Image
        src={src}
        alt="profile"
        width={130}
        height={130}
        className="relative mx-5 mt-5 rounded-full border-4 border-white bg-yellow-30 dark:border-dark-3"
      />

      <h3 className="mt-2.5 text-[1.625rem] font-semibold leading-[2.375rem] text-sc-1 dark:text-light">
        {name}
      </h3>

      <p className="text-[1rem] leading-[1.5rem] text-sc-2 dark:text-sc-3">
        {title}
      </p>

      {/* Made the Follow & Message buttons into their own components since both will use onClick which requires "use client" */}
      <ProfileBtns />

      <p className="mt-5 text-[0.875rem] font-semibold leading-[1.375rem] text-sc-2 dark:text-sc-6">
        {followers} Followers • {points} Points
      </p>

      <p className="mt-5 text-[0.875rem] font-semibold leading-[1.375rem] text-sc-2 dark:text-sc-6">
        Following {following.length}
      </p>

      {/* Gets all followers then slice all but 6 to run a map on that then returns clickable images of the users profiles */}
      <div className="mt-4 flex flex-wrap justify-center gap-2.5">
        {following.slice(0, 6).map((profile) => (
          <Link key={profile.id} href={profile.link}>
            <Image
              src={profile.src}
              alt="profile"
              width={30}
              height={30}
              className="rounded-full bg-sc-6 dark:border-dark-3"
            />
          </Link>
        ))}

        {/* If user has more than 6 followings then this shows how many more they are following minus 6 that is already showing */}
        {following.length > 6 && (
          <Link
            // TODO: Decide on where to take the user when they click on the + button
            href="/"
            className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-sc-6"
          >
            <p className="text-[0.875rem] font-semibold leading-[1.375rem] text-sc-2">
              {following.length - 6}+
            </p>
          </Link>
        )}
      </div>

      <p className="mt-5 w-[200px] text-center text-[0.875rem] font-semibold leading-[1.375rem] text-sc-3">
        {description}
      </p>

      <div className="flex flex-wrap justify-center gap-5 md:flex-col">
        {/* Website Link */}
        {website && (
          <Link
            href={website}
            className="mt-5 flex items-center gap-2 text-sc-2 dark:text-sc-6"
          >
            <OutlineIcon.Web className="fill-sc-2 dark:fill-light-2" />
            <p className="w-[130px] truncate">{website}</p>
          </Link>
        )}

        {/* Social Icons */}
        <div className="mt-5 flex justify-center gap-5">
          {socials.map((social) => {
            const SocialIcon =
              OutlineIcon[social.name as keyof typeof OutlineIcon];

            return (
              <Link key={social.name} href={social.link}>
                <SocialIcon className="fill-sc-4 dark:fill-sc-6" />
              </Link>
            );
          })}
        </div>
      </div>

      {/* div line that seperates socials from when the user joined */}
      <div className="mt-5 h-[1px] w-full bg-light-2 dark:bg-sc-3 md:mt-7" />

      {/* Shows when the account joined hipnode */}
      {/* TODO: create a function that returns the proper date format */}
      <p className="mt-5 text-[0.875rem] font-semibold leading-[1.375rem] text-sc-3 dark:text-sc-6 md:mt-7">
        {joinedAt}
      </p>
    </div>
  );
};

export default ProfileModal;
