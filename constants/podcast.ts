"use client";

import SocialIcon from "@/components/icons/outline-icons/SocialIcon";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from "react-share";

export const shareIcons = [
  {
    name: "facebook",
    wrapper: FacebookShareButton,
    icon: SocialIcon.Facebook,
  },
  {
    name: "twitter",
    wrapper: TwitterShareButton,
    icon: SocialIcon.Twitter,
  },
  {
    name: "linkedIn",
    wrapper: LinkedinShareButton,
    icon: SocialIcon.LinkedIn,
  },
];
