import FillIcon from "@/components/icons/fill-icons";
import OutlineIcon from "@/components/icons/outline-icons";

import { newest, popular, followers } from "@/public/images";
import {
  ColorVariantsOnboardingType,
  GroupPromiseProps,
  NotificationPopoverProps,
  NotificationTab,
} from "@/types";

export const PLACEHOLDER_IMAGE_URL = "/images/hipnode.svg";

export const headings = (
  fastestGrowingGroups: GroupPromiseProps,
  mostPopularGroups: GroupPromiseProps,
  newlyLaunchedGroups: GroupPromiseProps
) => [
  {
    title: "Fastest Growing",
    icon: FillIcon.Growing,
    bgColor: "bgYellow",
    groups: fastestGrowingGroups,
  },
  {
    title: "Most Popular",
    icon: FillIcon.Fire,
    bgColor: "bgRed",
    groups: mostPopularGroups,
  },
  {
    title: "Newly Launched",
    icon: FillIcon.Rocket,
    bgColor: "bgBlue",
    groups: newlyLaunchedGroups,
  },
];

export const sectionHeadings = (
  mostPopularGroups: GroupPromiseProps,
  newlyLaunchedGroups: GroupPromiseProps
) => [
  {
    title: "Most Popular",
    icon: FillIcon.Fire,
    bgColor: "bgRed",
    groups: mostPopularGroups,
  },
  {
    title: "Newly Launched",
    icon: FillIcon.Rocket,
    bgColor: "bgBlue",
    groups: newlyLaunchedGroups,
  },
];

export const groupHeaderData = {
  "fastest-growing": {
    header: {
      color: "bg-yellow-10",
      icon: FillIcon.Rocket,
      title: "Fastest Growing",
    },
  },
  "Most Popular": {
    header: {
      color: "bg-red-10",
      icon: FillIcon.Fire,
      title: "Most Popular",
    },
  },
  "Newly Launched": {
    header: {
      color: "bg-blue-10",
      icon: FillIcon.Rocket,
      title: "Newly Launched",
    },
  },
};

export const meetUpsCardPills = ["Remote", "Part", "World"];
export const routes = ["posts", "meetups", "podcasts", "interviews", "history"];

export const admins = [
  {
    name: "Taehong",
    avatar: "/negan.png",
  },
  {
    name: "Taehong",
    avatar: "/negan.png",
  },
  {
    name: "Taehong",
    avatar: "/negan.png",
  },
  {
    name: "Taehong",
    avatar: "/negan.png",
  },
];

export const colorVariants: ColorVariantsOnboardingType = {
  fillRed: "fill-red",
  fillBlue: "fill-blue",
  fillYellow: "fill-yellow",
  fillGreen: "fill-green",
  bgRed: "bg-red-10",
  bgBlue: "bg-blue-10",
  bgYellow: "bg-yellow-10",
  bgGreen: "bg-green-10",
};

export const reportModalTags = [
  "False Information?",
  "Low Quality",
  "Spam",
  "Hate Speech",
  "Inappropriate",
];

export const exploreIcons = [
  {
    Icon: OutlineIcon.New,
    color: "newIcon",
    secondaryColor: "newIconSecondary",
    bgColor: "newIconBg",
    textColor: "newIconText",
    label: "New",
  },
  {
    Icon: OutlineIcon.Popular,
    color: "popularIcon",
    bgColor: "popularBg",
    textColor: "popularText",
    label: "Popular",
  },
];

export const onboardingQuestions = [
  {
    title: "Which best describes the stage you're at right now?",
    answers: [
      "Considering or planning to start a business",
      "Actively getting started on something new",
      "No interest in starting a business",
      "Earnings from my business fully support me",
      "Working on a business, no revenue yet",
    ],
  },
  {
    title: "Do you know how to code?",
    answers: [
      "No, and coding is totally unfamiliar",
      "Not, but I understand a few concepts",
      "Yes, and I'm a beginner",
      "Yes, and I'm intermediate or a professional",
    ],
  },
  {
    title: "What types of businesses are you most interested in running?",
    answers: [
      "Advertising",
      "Task Management",
      "Email Marketing",
      "Crypto",
      "Design",
      "Finance",
      "Outdoors",
      "Health & Fitness",
      "Investing",
      "Home Automation",
      "Sports",
    ],
  },
];

export const signUpSideScreenInfo = {
  title: "Join a thriving community of entrepreneurs and developers.",
  posts: [
    {
      title: "Connect with other indie hackers running online businesses.",
      icon: FillIcon.Business,
      iconBgColor: "bgRed",
      iconFillColor: "fillRed",
    },
    {
      title: "Get feedback on your business ideas, landing pages, and more.",
      icon: FillIcon.Feedback,
      iconBgColor: "bgYellow",
      iconFillColor: "fillYellow",
    },
    {
      title: "Get the best new stories from founders in your inbox.",
      icon: FillIcon.Inbox,
      iconBgColor: "bgBlue",
      iconFillColor: "fillBlue",
    },
  ],
};

export const onboardingSideScreenInfo = {
  title: "Tell us a little about yourself!",
  posts: [
    {
      title: "Help us build the best community for people like you.",
      icon: FillIcon.Rocket,
      iconBgColor: "bgRed",
      iconFillColor: "fillRed",
    },
    {
      title: "Help us build the best community for people like you.",
      icon: FillIcon.Feedback,
      iconBgColor: "bgYellow",
      iconFillColor: "fillYellow",
    },
  ],
};

export const fastestGrowingSectionHeading = {
  title: "Fastest Growing",
  icon: FillIcon.Growing,
  bgColor: "bgYellow",
};

export const navLinks = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Calendar",
    link: "/meet-ups",
  },
  {
    name: "Group",
    link: "/group",
  },
  {
    name: "Podcasts",
    link: "/podcasts",
  },
  {
    name: "Interviews",
    link: "/interviews",
  },
];

export const tags = [
  {
    name: "javascript",
    views: "82,645 Posted by this tag",
    icon: OutlineIcon.Dev,
    iconBgColor: "bgYellow",
    iconFillColor: "fillYellow",
  },
  {
    name: "bitcoin",
    views: "65,523 Posted • Trending",
    icon: OutlineIcon.Popular,
    iconBgColor: "bgRed",
    iconFillColor: "fillRed",
  },
  {
    name: "design",
    views: "51,354 • Trending in Poland",
    icon: OutlineIcon.Popular,
    iconBgColor: "bgBlue",
    iconFillColor: "fillBlue",
  },
  {
    name: "blogging",
    views: "48,029 Posted by this tag",
    icon: OutlineIcon.Dev,
    iconBgColor: "bgYellow",
    iconFillColor: "fillYellow",
  },
  {
    name: "tutorial",
    views: "51,354 • Trending in Bangladesh",
    icon: OutlineIcon.Dev,
    iconBgColor: "bgGreen",
    iconFillColor: "fillGreen",
  },
  {
    name: "seo",
    views: "82,152 Posted by this tag",
    icon: OutlineIcon.Popular,
    iconBgColor: "bgRed",
    iconFillColor: "fillRed",
  },
];

export const homePageTags = [
  {
    icon: OutlineIcon.Dev,
    iconBgColor: "bgYellow",
    iconFillColor: "fillYellow",
  },
  {
    icon: OutlineIcon.Popular,
    iconBgColor: "bgRed",
    iconFillColor: "fillRed",
  },
  {
    icon: OutlineIcon.Popular,
    iconBgColor: "bgBlue",
    iconFillColor: "fillBlue",
  },
  {
    icon: OutlineIcon.Dev,
    iconBgColor: "bgYellow",
    iconFillColor: "fillYellow",
  },
  {
    icon: OutlineIcon.Dev,
    iconBgColor: "bgGreen",
    iconFillColor: "fillGreen",
  },
  {
    icon: OutlineIcon.Popular,
    iconBgColor: "bgRed",
    iconFillColor: "fillRed",
  },
];

// Data for the CategoryFilter component
export const CategoryFilterData = [
  {
    name: "Business Model",
    filters: [
      "Free",
      "Advertising",
      "Affiliate",
      "Transactional",
      "Subscription-Based",
    ],
  },
  {
    name: "Monthly Revenue",
    filters: ["2000", "3000", "4000", "5000", "8000"],
  },
  {
    name: "Employees",
    filters: ["1", "2", "3", "4", "5"],
  },
];

export const srcArray = [
  "/emoji_2.png",
  "/emoji_2.png",
  "/emoji_2.png",
  "/emoji_2.png",
  "/emoji_2.png",
  "/emoji_2.png",
  "/emoji_2.png",
  "/emoji_2.png",
];

export const sidebarItems = [
  {
    imgSrc: newest,
    imgAlt: "newest and recent",
    title: "Newest",
    subTitle: "and recent",
    description: "Find the latest update",
    imgContainerClass:
      "h-[1.75rem] w-[1.75rem] rounded-md bg-light-3 p-[0.25rem] dark:bg-dark-4",
  },
  {
    imgSrc: popular,
    imgAlt: "popular of the day",
    title: "Popular",
    subTitle: "of the day",
    description: "Shots featured today by curators",
    imgContainerClass:
      "flex h-[1.75rem] w-[1.75rem] items-center justify-center rounded-md bg-light-3 dark:bg-dark-4",
  },
  {
    imgSrc: followers,
    imgAlt: "followers",
    title: "Following",
    description: "Explore from your favorite person",
    notification: 24,
    imgContainerClass:
      "h-[1.75rem] w-[1.75rem] rounded-md bg-light-3 p-[0.25rem] dark:bg-dark-4",
  },
];

export const notificationTabs: NotificationTab[] = [
  {
    title: "All notifications",
    active: true,
  },
  {
    title: "Reactions",
    icon: OutlineIcon.Heart,
    active: false,
  },
  {
    title: "Comments",
    icon: OutlineIcon.Comment,
    active: false,
  },
  {
    title: "Mentions",
    icon: OutlineIcon.Mention,
    active: false,
  },
  {
    title: "Posts",
    icon: OutlineIcon.Post,
    active: false,
  },
];

export const dummyNotifications: NotificationPopoverProps[] = [
  {
    name: "Mentor Christopher",
    type: "comment",
    comment: "Great ebook & giveaway!",
    title: "Hipnode. Book Giveaway: The Standout Developer by Randall Kanna",
    date: "16 Oct, 3:26pm",
    read: false,
    image: "/christopher.png",
  },
  {
    name: "Mentor Santiago",
    type: "reaction",
    title: "Argentina Wins World Cup",
    date: "14 Oct, 9:10am",
    read: false,
    image: "/santiago.png",
  },
  {
    name: "Negan",
    type: "mention",
    title: "5 Key UI Design Principle for Beginners",
    date: "12 Oct, 12:26pm",
    read: true,
    image: "/negan.png",
  },
];

export const groupFormLinkProps = {
  title: "Create Group",
  description:
    "Create a community and unite with like-minded individuals. Embark on exciting journeys together.",
  codeOfConductButton: {
    title: "Code of Conduct",
    link: "/",
  },
  linkToFormButton: {
    title: "Create Group",
    link: "/group/create-group",
  },
};

// Add real links once they're available
export const podcastFormLinkProps = {
  title: "Start your Podcast",
  description:
    "Working on your own internet business? We'd love to interview you!",
  codeOfConductButton: {
    title: "Code of Conduct",
    link: "/",
  },
  linkToFormButton: {
    title: "Submit a Podcast",
    link: "/",
  },
};

export const profileFilters = [
  "Posts",
  "Meetups",
  "Podcasts",
  "Interviews",
  "History",
];

// ! Dummy data for the profile page
export const profileData = {
  src: "/images/emoji_2.png",
  name: "AR. Jakir",
  title: "User Interface Designer",
  points: "880",
  description:
    "Hey there... I'm AR Jakir! I'm here to learn from and support the other members of this community!",
  website: "https://google.com",
  joinedAt: "joined 2 years ago",
  followers: [
    {
      name: "Tye1",
      src: "/images/emoji_2.png",
      link: "/profile-page",
    },
    {
      name: "Tye2",
      src: "/images/emoji_2.png",
      link: "/profile-page",
    },
  ],
  following: [
    {
      id: "1",
      name: "Tye1",
      src: "/images/emoji_2.png",
      link: "/profile-page1",
    },
    {
      id: "2",
      name: "Tye2",
      src: "/images/emoji_2.png",
      link: "/profile-page2",
    },
    {
      id: "3",
      name: "Tye3",
      src: "/images/emoji_2.png",
      link: "/profile-page3",
    },
    {
      id: "4",
      name: "Tye4",
      src: "/images/emoji_2.png",
      link: "/profile-page4",
    },
    {
      id: "5",
      name: "Tye5",
      src: "/images/emoji_2.png",
      link: "/profile-page5",
    },
    {
      id: "6",
      name: "Tye6",
      src: "/images/emoji_2.png",
      link: "/profile-page6",
    },
    {
      id: "7",
      name: "Tye7",
      src: "/images/emoji_2.png",
      link: "/profile-page7",
    },
  ],
  socials: [
    {
      name: "Twitter",
      link: "https://twitter.com/",
    },
    {
      name: "Facebook",
      link: "https://facebook.com/",
    },
    {
      name: "Instagram",
      link: "https://instagram.com/",
    },
  ],
};

export const playbackSpeedOptions = [0.75, 1.0, 1.25, 1.5];

export const performanceData = [
  {
    contentImg: "/postCardPlacholder.png",
    views: 100,
    likes: 100,
    comments: 100,
  },
  {
    contentImg: "/postCardPlacholder.png",
    views: 100,
    likes: 100,
    comments: 100,
  },
  {
    contentImg: "/postCardPlacholder.png",
    views: 100,
    likes: 100,
    comments: 100,
  },
  {
    contentImg: "/postCardPlacholder.png",
    views: 100,
    likes: 100,
    comments: 100,
  },
];

export interface HostMeetupCardProps {
  title: string;
  desc: string;
  leftBtn: string;
  rightBtn: string;
}

export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const abbMonthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const meetupFormLinkProps = {
  title: "Host a Meetup",
  description:
    "Find other Hipnoders in your area so you can learn, share, and work together.",
  codeOfConductButton: {
    title: "Code of Conduct",
    link: "/",
  },
  linkToFormButton: {
    title: "Host a Meetup",
    link: "/",
  },
};
