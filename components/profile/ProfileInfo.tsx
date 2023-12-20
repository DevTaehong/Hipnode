import Image from "next/image";
import Link from "next/link";

import ProfileBtns from "./ProfileBtns";
import OutlineIcon from "../icons/outline-icons";
import ProfileLink from "./ProfileLink";

import { ProfileInfoProps } from "@/types";
import SocialIcon from "./SocialIcon";
import TextDescription from "./TextDescription";

const ProfileModal = ({
  src,
  name,
  title,
  followers,
  following,
  points,
  description,
  website,
  twitter,
  instagram,
  facebook,
  profileFollowing,
  joinedAt,
}: ProfileInfoProps) => {
  return (
    <div className="relative mx-auto flex flex-col items-center rounded-2xl bg-white p-5 dark:bg-dark-3 min-[477px]:max-w-[13.125rem]">
      <div className="absolute left-0 top-0 h-[6.50rem] w-full rounded-t-2xl bg-profile-modal bg-cover bg-center bg-no-repeat" />

      <Image
        src={src || "/images/emoji_2.png"}
        alt="profile"
        width={130}
        height={130}
        className="relative mx-5 mt-5 rounded-full border-4 border-white bg-yellow-30 dark:border-dark-3"
      />

      <h3 className="mt-2.5 text-[1.625rem] font-semibold leading-[2.375rem] text-sc-1 dark:text-light">
        {name}
      </h3>

      <p className="text-center text-[1rem] leading-[1.5rem] text-sc-2 dark:text-sc-3">
        {title}
      </p>

      <ProfileBtns />

      <TextDescription className="mt-5 text-sc-2 dark:text-sc-6">
        {followers} Followers • {points} Points
      </TextDescription>

      <TextDescription className="mt-5 text-sc-2 dark:text-sc-6">
        Following {following}
      </TextDescription>

      <div className="mt-4 flex flex-wrap justify-center gap-2.5">
        {profileFollowing?.map(({ followed }) => (
          <ProfileLink
            key={followed.profileUrlId}
            username={followed.profileUrlId}
            picture={followed.picture}
          />
        ))}

        {following && following > 6 ? (
          <Link
            href="/"
            className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-sc-6"
          >
            <p className="text-[0.875rem] font-semibold leading-[1.375rem] text-sc-2">
              {following - 6}+
            </p>
          </Link>
        ) : (
          profileFollowing.length === 0 && (
            <Link
              href="/"
              className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-sc-6"
            >
              <p className="text-[0.875rem] font-semibold leading-[1.375rem] text-sc-2">
                0
              </p>
            </Link>
          )
        )}
      </div>

      <TextDescription className="mt-5 w-[200px] text-center text-sc-3">
        {description}
      </TextDescription>

      <div className="mt-5 flex flex-wrap justify-center gap-5 md:flex-col">
        {website && (
          <Link
            href={website}
            className="flex items-center gap-2 text-sc-2 dark:text-sc-6"
          >
            <OutlineIcon.Web className="fill-sc-2 dark:fill-light-2" />
            <p className="w-[130px] truncate text-[0.875rem]">{website}</p>
          </Link>
        )}

        <div className="flex justify-center gap-5">
          {twitter && <SocialIcon icon="Twitter" link={twitter} />}

          {instagram && <SocialIcon icon="Instagram" link={instagram} />}

          {facebook && <SocialIcon icon="Facebook" link={facebook} />}
        </div>
      </div>

      <div className="mt-5 h-[1px] w-full bg-light-2 dark:bg-sc-3 md:mt-7" />

      <TextDescription className="mt-5 text-sc-3 dark:text-sc-6 md:mt-7">
        joined {joinedAt}
      </TextDescription>
    </div>
  );
};

export default ProfileModal;
