import HipnodeHeaderLogo from "../icons/HipnodeHeaderLogo";
import { HeartIcon } from "../icons/outline-icons";
import { OnboardingSideScreenProps } from "@/interfaces";

const OnboardingSideScreen = ({ info }: OnboardingSideScreenProps) => {
  return (
    <section className="flex h-full w-full grow flex-col items-center bg-lightBackground-2 p-[1.875rem] dark:bg-dark-dark2 md:min-h-screen md:w-1/2 md:p-10">
      <HipnodeHeaderLogo />
      <div className="mt-[3.75rem] flex max-w-[27.625rem] flex-col gap-10 md:mt-20">
        <h3 className="semibold-18 md:bold-30 text-dark-secondary2 dark:text-lightBackground">
          {info ? info.title : "Sign in to Hipnode."}
        </h3>
        <div className="flex flex-col gap-5">
          {info && info.posts.length > 0 ? (
            info.posts.map((post) => {
              const IconComponent = post.icon;

              return (
                <div
                  key={post.title}
                  className="flex items-center gap-5 rounded-lg bg-lightBackground p-5 dark:bg-dark-dark3"
                >
                  <div
                    className={`flex rounded-md dark:bg-dark-dark4 dark:grayscale-[10%] dark:invert-[20%]`}
                    style={{
                      backgroundColor: post.iconBgColor,
                    }}
                  >
                    <IconComponent
                      additionalClass={`h-[3.75rem] rounded-lg w-[3.75rem] p-5`}
                    />
                  </div>
                  <p className="semibold-14 md:semibold-18 dark:text-lightBackground-6">
                    {post.title}
                  </p>
                </div>
              );
            })
          ) : (
            <>
              <div className="flex items-center gap-5 rounded-lg bg-lightBackground p-5 dark:bg-dark-dark3">
                <div
                  className="flex rounded-md dark:bg-dark-dark4 dark:grayscale-[10%] dark:invert-[65%]"
                  style={{ backgroundColor: "#E7FAF4" }}
                >
                  <HeartIcon additionalClass="h-[3.75rem] w-[3.75rem] p-5 rounded-md" />
                </div>
                <p className="semibold-14 md:semibold-18 dark:text-lightBackground-6">
                  Did you join before February 2017? You need to{" "}
                  <span className="text-red-80">connect</span> an email address
                  to your username.{" "}
                </p>
              </div>
              <div className="flex items-center gap-5 rounded-lg bg-lightBackground p-5 dark:bg-dark-dark3">
                <div
                  className="flex rounded-md dark:bg-dark-dark4 dark:grayscale-[10%] dark:invert-[65%]"
                  style={{ backgroundColor: "#FDF4EA" }}
                >
                  <HeartIcon additionalClass="h-[3.75rem] w-[3.75rem] p-5 rounded-md" />
                </div>{" "}
                <p className="semibold-14 md:semibold-18 dark:text-lightBackground-6">
                  Trouble logging in? <span className="text-red-80">Reset</span>{" "}
                  your password.{" "}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default OnboardingSideScreen;
