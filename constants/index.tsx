import FillIcon from "@/components/icons/fill-icons";

import {
  PopularIcon,
  NewIcon,
  DevIcon,
} from "@/components/icons/outline-icons";

export const exploreIcons = [
  {
    Icon: NewIcon,
    color: "newIcon",
    secondaryColor: "newIconSecondary",
    bgColor: "newIconBg",
    textColor: "newIconText",
    label: "New",
  },
  {
    Icon: PopularIcon,
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
    icon: DevIcon,
    iconBgColor: "bgYellow",
    iconFillColor: "fillYellow",
  },
  {
    name: "bitcoin",
    views: "65,523 Posted • Trending",
    icon: PopularIcon,
    iconBgColor: "bgRed",
    iconFillColor: "fillRed",
  },
  {
    name: "design",
    views: "51,354 • Trending in Poland",
    icon: PopularIcon,
    iconBgColor: "bgBlue",
    iconFillColor: "fillBlue",
  },
  {
    name: "blogging",
    views: "48,029 Posted by this tag",
    icon: DevIcon,
    iconBgColor: "bgYellow",
    iconFillColor: "fillYellow",
  },
  {
    name: "tutorial",
    views: "51,354 • Trending in Bangladesh",
    icon: DevIcon,
    iconBgColor: "bgGreen",
    iconFillColor: "fillGreen",
  },
  {
    name: "seo",
    views: "82,152 Posted by this tag",
    icon: PopularIcon,
    iconBgColor: "bgRed",
    iconFillColor: "fillRed",
  },
];
