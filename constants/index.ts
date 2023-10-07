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
