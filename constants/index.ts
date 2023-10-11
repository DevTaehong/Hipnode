import FillIcon from "@/components/icons/fill-icons";
import { christopher, santiago, negan } from "@/public/assets";

const fastestGrowingGroups = [
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

const mostPopularGroups = [
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

const newlyLaunchedGroups = [
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
