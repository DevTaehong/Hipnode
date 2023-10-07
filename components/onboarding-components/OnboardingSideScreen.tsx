import HipnodeHeaderLogo from "../icons/HipnodeHeaderLogo";
import InboxIcon from "../icons/fill-icons/InboxIcon";
import TroubleIcon from "../icons/fill-icons/TroubleIcon";
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
                    <svg
                      style={{
                        fill: post.iconFillColor,
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                    >
                      <IconComponent />
                    </svg>
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
                  <svg
                    style={{
                      fill: "#0ECC8D",
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                  >
                    <InboxIcon />
                  </svg>
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
                  <svg
                    style={{
                      fill: "#EA942C",
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                  >
                    <TroubleIcon />
                  </svg>
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
