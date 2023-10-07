import HipnodeHeaderLogo from "../icons/HipnodeHeaderLogo";
import FillIcon from "../icons/fill-icons";
import { OnboardingSideScreenProps } from "@/interfaces";
import { colorVariantsOnboarding as colorVariants } from "@/constants";

const OnboardingSideScreen = ({ info }: OnboardingSideScreenProps) => {
  return (
    <section className="onboarding-background">
      <HipnodeHeaderLogo />
      <div className="onboarding-main-div">
        <h3 className="onboarding-heading">
          {info ? info.title : "Sign in to Hipnode."}
        </h3>
        <div className="onboarding-answer-container">
          {info && info.posts.length > 0 ? (
            info.posts.map((post) => {
              const IconComponent = post.icon;

              return (
                <div key={post.title} className="onboarding-card-small">
                  <div
                    className={`onboarding-card-small-image ${
                      colorVariants[post.iconBgColor]
                    }`}
                  >
                    <IconComponent
                      className={`${colorVariants[post.iconFillColor]}`}
                    />
                  </div>
                  <p className="onboarding-card-small-text">{post.title}</p>
                </div>
              );
            })
          ) : (
            <>
              <div className="onboarding-card-small">
                <div
                  className={`onboarding-card-small-image ${colorVariants.green10}`}
                >
                  <FillIcon.Inbox className={`${colorVariants.green}`} />
                </div>
                <p className="onboarding-card-small-text">
                  Did you join before February 2017? You need to{" "}
                  <span className="text-red-80">connect</span> an email address
                  to your username.{" "}
                </p>
              </div>
              <div className="onboarding-card-small">
                <div
                  className={`onboarding-card-small-image ${colorVariants.yellow10}`}
                >
                  <FillIcon.Trouble className={`${colorVariants.yellow}`} />
                </div>{" "}
                <p className="onboarding-card-small-text">
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
