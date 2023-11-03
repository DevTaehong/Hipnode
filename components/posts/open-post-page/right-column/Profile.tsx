import Image from "next/image";

import CustomButton from "@/components/CustomButton";
import RightColumnWrapper from "./RightColumnWrapper";

interface ProfileProps {
  username: string;
  image: string;
}

const Profile = ({ username, image }: ProfileProps) => (
  <RightColumnWrapper>
    <div className="mb-[1.25rem] flex  h-[6.25rem] w-[6.25rem] items-center justify-center rounded-full bg-purple-20">
      <Image
        src={image}
        alt="profile-image"
        height={100}
        width={100}
        className="flex-center h-[5rem] w-[5rem] rounded-full"
      />
    </div>
    <h2 className="flex justify-center text-[1.625rem] leading-[2.375rem] text-sc-2 dark:text-light-2">
      {username}
    </h2>
    <p className="mb-[1.25rem] flex justify-center text-[1rem] leading-[1.5rem] text-sc-3">
      Web Developer
    </p>
    <CustomButton
      label="Follow"
      className="flex w-full mb-[1.25rem] items-center bg-blue leading-{1.625rem] rounded-md p-[0.625rem] text-[1.125rem] text-light"
    />
    <p className="flex justify-center text-[1rem] leading-[1.5rem] text-sc-3">
      joined 6 months ago
    </p>
  </RightColumnWrapper>
);

export default Profile;
