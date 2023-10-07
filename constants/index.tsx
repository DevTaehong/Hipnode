import { PopularIcon, NewIcon } from "@/components/icons/outline-icons";

export const exploreIcons = [
  {
    icon: (
      <NewIcon
        color="fill-sc-2 dark:fill-light-2"
        textColor="fill-light-2 dark:fill-dark-3"
      />
    ),
    bgColor: "bg-light-2 dark:bg-dark-4",
    textColor: "text-sc-2 dark:text-light-2",
    label: "New",
  },
  {
    icon: <PopularIcon color="fill-red-80" />,
    bgColor: "bg-red-10",
    textColor: "text-red-80",
    label: "Popular",
  },
];
