import FillIcon from "@/components/icons/fill-icons";
import OutlineIcon from "@/components/icons/outline-icons";

import { christopher, santiago, negan } from "@/public/assets";
import { newest, popular, followers } from "@/public/images";
import {
  ColorVariantsOnboardingType,
  GroupData,
  NotificationPopoverProps,
  NotificationTab,
} from "@/types";

export const meetUpsCardPills = ["Remote", "Part-time", "Worldwide"];
export const routes = ["posts", "meetups", "podcasts", "interviews", "history"];

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

export const fastestGrowingGroups = [
  {
    icon: christopher,
    groupDescription: "Lorem ipsum dolor sit amet consectetur",
    groupName: "Lorem ipsum dolor",
  },
  {
    icon: christopher,
    groupDescription: "Adipiscing elit, sed do eiusmod tempor",
    groupName: "Sit amet consectetur",
  },
  {
    icon: christopher,
    groupDescription: "Incididunt ut labore et dolore magna",
    groupName: "Adipiscing elit duis",
  },
  {
    icon: christopher,
    groupDescription: "Aliqua enim ad minim veniam quis",
    groupName: "Tristique sollicitudin nibh",
  },
  {
    icon: christopher,
    groupDescription: "Nostrud exercitation ullamco laboris nisi ut",
    groupName: "Sit amet commodo",
  },
  {
    icon: christopher,
    groupDescription: "Nostrud exercitation ex ea commodo",
    groupName: "Odio aenean sed",
  },
  {
    icon: christopher,
    groupDescription: "Aliquip ex ea commodo consequat duis",
    groupName: "Adipiscing diam donec",
  },
  {
    icon: christopher,
    groupDescription: "Aute irure dolor in reprehenderit in",
    groupName: "Amet venenatis urna",
  },
  {
    icon: christopher,
    groupDescription: "Voluptate velit esse cillum dolore eu",
    groupName: "Cursus eget nunc",
  },
  {
    icon: christopher,
    groupDescription: "Fugiat nulla pariatur excepteur sint occaeca",
    groupName: "Scelerisque viverra mauris",
  },
];

export const mostPopularGroups = [
  {
    icon: santiago,
    groupDescription: "Praesent sapien massa, convallis a pellentesque",
    groupName: "Vivamus suscipit tortor",
  },
  {
    icon: santiago,
    groupDescription: "Donec sollicitudin molestie malesuada curabitur",
    groupName: "Non nulla sit",
  },
  {
    icon: santiago,
    groupDescription: "Nulla porttitor accumsan tincidunt vestibulum",
    groupName: "Ac felis donec",
  },
  {
    icon: santiago,
    groupDescription: "Sed augue lacus viverra vitae congue",
    groupName: "Eu augue ut",
  },
  {
    icon: santiago,
    groupDescription: "Eu sem integer vitae justo eget",
    groupName: "Magnis dis parturient",
  },
  {
    icon: santiago,
    groupDescription: "Felis bibendum ut tristique et egestas",
    groupName: "Purus viverra accumsan",
  },
  {
    icon: santiago,
    groupDescription: "Pellentesque elit eget gravida cum sociis",
    groupName: "Natoque penatibus magnis",
  },
  {
    icon: santiago,
    groupDescription: "Purus in mollis nunc sed id",
    groupName: "Semper risus in",
  },
  {
    icon: santiago,
    groupDescription: "Donec pretium vulputate sapien nec sagittis",
    groupName: "Aliquam malesuada bibendum",
  },
  {
    icon: santiago,
    groupDescription: "Aliquam faucibus purus in massa tempor",
    groupName: "Nec dui nunc",
  },
];

export const newlyLaunchedGroups = [
  {
    icon: negan,
    groupDescription: "Viverra mauris in aliquam sem fringilla",
    groupName: "Ullamcorper dignissim cras",
  },
  {
    icon: negan,
    groupDescription: "Risus pretium quam vulputate dignissim suspendisse",
    groupName: "Ultrices gravida dictum",
  },
  {
    icon: negan,
    groupDescription: "Nisl purus in mollis nunc sed",
    groupName: "Id interdum velit",
  },
  {
    icon: negan,
    groupDescription: "Enim nunc faucibus a pellentesque sit",
    groupName: "Amet tellus cras",
  },
  {
    icon: negan,
    groupDescription: "Feugiat in ante metus dictum at",
    groupName: "Tempor commodo ullamcorper",
  },
  {
    icon: negan,
    groupDescription: "Turpis egestas maecenas pharetra convallis posuere",
    groupName: "Morbi tristique senectus",
  },
  {
    icon: negan,
    groupDescription: "Consequat semper viverra nam libero justo",
    groupName: "Laoreet sit amet",
  },
  {
    icon: negan,
    groupDescription: "Leo urna molestie at elementum eu",
    groupName: "Facilisis lacinia egestas",
  },
  {
    icon: negan,
    groupDescription: "Eros donec ac odio tempor orci",
    groupName: "Dapibus ultrices in",
  },
  {
    icon: negan,
    groupDescription: "Ac orci phasellus egestas tellus rutrum",
    groupName: "Consectetur adipiscing elit",
  },
];

export const sectionHeadings = [
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

export const navLinks = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Calendar",
    link: "/calendar",
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

// NOTE - Delete this dummy data when we have real data
export const dummyMessages = [
  {
    name: "Wade Warren",
    date: "20 minutes ago",
    message: "Congrats on your work anniversary!",
    avatar: "https://github.com/shadcn.png",
    avatarFallback: "CN",
    newMessageCounts: 0,
  },
  {
    name: "Wade Warren 1",
    date: "20 minutes ago",
    message: "Congrats on your work anniversary!",
    avatar: "https://github.com/shadcn.png",
    avatarFallback: "CN",
    newMessageCounts: 1,
  },
  {
    name: "Wade 22 Warren 2",
    date: "20 minutes ago",
    message: "Congrats on your work anniversary!",
    avatar: "https://github.com/shadcn.png",
    avatarFallback: "CN",
    newMessageCounts: 2,
  },
  {
    name: "Wade 222 Warren Warren Warren",
    date: "20 minutes ago",
    message:
      "Congrats on your work anniversary! Congrats on your work anniversary!",
    avatar: "https://github.com/shadcn.png",
    avatarFallback: "CN",
    newMessageCounts: 0,
  },
  {
    name: "Wade  22Warren 3",
    date: "20 minutes ago",
    message: "Congrats on your work anniversary!",
    avatar: "https://github.com/shadcn.png",
    avatarFallback: "CN",
    newMessageCounts: 4,
  },
  {
    name: "Wade  22Warren 4",
    date: "20 minutes ago",
    message: "Congrats on your work anniversary!",
    avatar: "https://github.com/shadcn.png",
    avatarFallback: "CN",
    newMessageCounts: 5,
  },
  {
    name: "Wade  22Warren 5",
    date: "20 minutes ago",
    message: "Congrats on your work anniversary!",
    avatar: "https://github.com/shadcn.png",
    avatarFallback: "CN",
    newMessageCounts: 2,
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

export const socialStats = {
  views: "651,764",
  likes: "365,987",
  comments: "58",
};

export const postTabs = ["finance", "bitcoin", "crypto"];

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

export const groupData: GroupData = {
  "fastest-growing": {
    header: {
      color: "bg-yellow-10",
      icon: FillIcon.Rocket,
      title: "Fastest Growing",
    },
    groups: fastestGrowingGroups,
  },
  "Most Popular": {
    header: { color: "bg-red-10", icon: FillIcon.Fire, title: "Most Popular" },
    groups: mostPopularGroups,
  },
  "Newly Launched": {
    header: {
      color: "bg-blue-10",
      icon: FillIcon.Rocket,
      title: "Newly Launched",
    },
    groups: newlyLaunchedGroups,
  },
};

export const playbackSpeedOptions = [0.75, 1.0, 1.25, 1.5];

export const devInfo = [
  {
    title: "Self-taught developer Journal, Day 51",
    tags: "#webdev #beginners #codenewbie #devjournal",
  },
  {
    title: "Coding Bootcamp Journey, Day 51",
    tags: "#webdev #beginners #codenewbie #devjournal",
  },
  {
    title: "Formal Education Pathway, Day 51",
    tags: "#webdev #beginners #codenewbie #devjournal",
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
