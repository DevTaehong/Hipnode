import { HeartIcon } from "@/components/icons/outline-icons";

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

export const clerkModalStyles = {
  rootBox: "w-full flex h-fit",
  footerAction: "flex items-center",
  formButtonPrimary: "bg-red-60 hover:bg-red-80",
  footerActionText: "text-xs sm:text-sm",
  footerActionLink: "text-sm sm:text-base text-red-60 hover:text-red-80",
  dividerRow: "hidden",
  socialButtonsBlockButtonText: "hidden",
  socialButtonsBlockButtonArrow: "hidden",
  socialButtonsBlockButton: "p-4 h-10 w-10 sm:h-14 sm:w-14 flex justify-center",
  card: "pt-[4.5rem] w-full sm:pt-24 w-fit mx-8 px-6 gap-3.5 sm:gap-4",
  form: "gap-3 sm:gap-4",
  main: "gap-6 sm:gap-8",
  headerTitle: "text-sm sm:text-xl dark:text-lightBackground",
  headerSubtitle: "text-xs sm:text-base",
  socialButtonsProviderIcon: "h-3.5 sm:h-5 w-3.5 sm:w-5",
  formFieldInput: "h-6 sm:h-9",
  formFieldLabel: "text-xs sm:text-sm",
  formFieldHintText: "text-xs sm:text-sm",
};

export const signUpSideScreenInfo = {
  title: "Join a thriving community of entrepreneurs and developers.",
  posts: [
    {
      title: "Connect with other indie hackers running online businesses.",
      icon: HeartIcon,
      iconBgColor: "#FFECE6",
    },
    {
      title: "Get feedback on your business ideas, landing pages, and more.",
      icon: HeartIcon,
      iconBgColor: "#FDF4EA",
    },
    {
      title: "Get the best new stories from founders in your inbox.",
      icon: HeartIcon,
      iconBgColor: "#EBF2FC",
    },
  ],
};

export const onboardingSideScreenInfo = {
  title: "Tell us a little about yourself!",
  posts: [
    {
      title: "Help us build the best community for people like you.",
      icon: HeartIcon,
      iconBgColor: "#FFECE6",
    },
    {
      title: "Help us build the best community for people like you.",
      icon: HeartIcon,
      iconBgColor: "#FDF4EA",
    },
  ],
};
