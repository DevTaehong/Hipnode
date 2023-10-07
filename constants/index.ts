import FillIcon from "@/components/icons/fill-icons";

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
      iconBgColor: "red10",
      iconFillColor: "red",
    },
    {
      title: "Get feedback on your business ideas, landing pages, and more.",
      icon: FillIcon.Feedback,
      iconBgColor: "yellow10",
      iconFillColor: "yellow",
    },
    {
      title: "Get the best new stories from founders in your inbox.",
      icon: FillIcon.Inbox,
      iconBgColor: "blue10",
      iconFillColor: "blue",
    },
  ],
};

export const onboardingSideScreenInfo = {
  title: "Tell us a little about yourself!",
  posts: [
    {
      title: "Help us build the best community for people like you.",
      icon: FillIcon.Rocket,
      iconBgColor: "red10",
      iconFillColor: "red",
    },
    {
      title: "Help us build the best community for people like you.",
      icon: FillIcon.Feedback,
      iconBgColor: "yellow10",
      iconFillColor: "yellow",
    },
  ],
};

export const colorVariantsOnboarding: {
  [key: string]: string;
  red: string;
  blue: string;
  yellow: string;
  green: string;
  red10: string;
  blue10: string;
  yellow10: string;
  green10: string;
} = {
  red: "fill-red",
  blue: "fill-blue",
  yellow: "fill-yellow",
  green: "fill-green",
  red10: "bg-red-10",
  blue10: "bg-blue-10",
  yellow10: "bg-yellow-10",
  green10: "bg-green-10",
};
