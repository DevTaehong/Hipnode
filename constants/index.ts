import BusinessIcon from "@/components/icons/fill-icons/BusinessIcon";
import FeedbackIcon from "@/components/icons/fill-icons/FeedbackIcon";
import RocketIcon from "@/components/icons/fill-icons/RocketIcon";
import InboxIcon from "@/components/icons/fill-icons/InboxIcon";

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
      icon: BusinessIcon,
      iconBgColor: "#FFECE6",
      iconFillColor: "#FF4401",
    },
    {
      title: "Get feedback on your business ideas, landing pages, and more.",
      icon: FeedbackIcon,
      iconBgColor: "#FDF4EA",
      iconFillColor: "#EA942C",
    },
    {
      title: "Get the best new stories from founders in your inbox.",
      icon: InboxIcon,
      iconBgColor: "#EBF2FC",
      iconFillColor: "#347AE2",
    },
  ],
};

export const onboardingSideScreenInfo = {
  title: "Tell us a little about yourself!",
  posts: [
    {
      title: "Help us build the best community for people like you.",
      icon: RocketIcon,
      iconBgColor: "#FFECE6",
      iconFillColor: "#FF571A",
    },
    {
      title: "Help us build the best community for people like you.",
      icon: FeedbackIcon,
      iconBgColor: "#FDF4EA",
      iconFillColor: "#EA942C",
    },
  ],
};
