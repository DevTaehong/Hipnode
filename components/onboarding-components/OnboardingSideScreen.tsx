import HipnodeHeaderLogo from "../icons/HipnodeHeaderLogo";
import { HeartIcon } from "../icons/outline-icons";
import { OnboardingSideScreenProps } from "@/interfaces";

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
                    className={`onboarding-card-small-image`}
                    style={{
                      backgroundColor: post.iconBgColor,
                    }}
                  >
                    <IconComponent
                      additionalClass={`h-[3.75rem] rounded-lg w-[3.75rem] p-5`}
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
                  className="onboarding-card-small-image"
                  style={{ backgroundColor: "#E7FAF4" }}
                >
                  <HeartIcon additionalClass="h-[3.75rem] w-[3.75rem] p-5 rounded-md" />
                </div>
                <p className="onboarding-card-small-text">
                  Did you join before February 2017? You need to{" "}
                  <span className="text-red-80">connect</span> an email address
                  to your username.{" "}
                </p>
              </div>
              <div className="onboarding-card-small">
                <div
                  className="onboarding-card-small-image"
                  style={{ backgroundColor: "#FDF4EA" }}
                >
                  <HeartIcon additionalClass="h-[3.75rem] w-[3.75rem] p-5 rounded-md" />
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
