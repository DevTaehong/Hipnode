import HipnodeHeaderLogo from "../icons/HipnodeHeaderLogo";
import { HeartIcon } from "../icons/outline-icons";

const TellUsAboutYourself = () => {
  return (
    <section className="flex h-full w-full grow flex-col items-center bg-lightBackground-2 p-[1.875rem] dark:bg-dark-dark2 md:min-h-screen md:w-1/2 md:p-10">
      <HipnodeHeaderLogo />
      <div className="mt-[3.75rem] flex max-w-[27.625rem] flex-col gap-10 md:mt-20">
        <h3 className="semibold-18 md:bold-30 text-dark-secondary2 dark:text-lightBackground">
          Tell us a little about yourself!
        </h3>
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-5 rounded-lg bg-lightBackground p-5 dark:bg-dark-dark3">
            <HeartIcon
              additionalClass={`h-[3.75rem] w-[3.75rem] p-5 rounded-md bg-red-10`}
            />
            <p className="semibold-14 md:semibold-18">
              Help us build the best community for people like you.
            </p>
          </div>
          <div className="flex items-center gap-5 rounded-lg bg-lightBackground p-5 dark:bg-dark-dark3">
            <HeartIcon
              additionalClass={`h-[3.75rem] w-[3.75rem] p-5 rounded-md bg-yellow-10`}
            />
            <p className="semibold-14 md:semibold-18">
              See the best content and conversations, tailored to your
              interests.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TellUsAboutYourself;
