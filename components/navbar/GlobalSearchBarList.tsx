import Link from "next/link";
import FillIcon from "../icons/fill-icons";
import { GlobalSearchBarListProps } from "@/types/searchbar.index";

const resultInfo = [
  {
    title: "post",
    url: "/posts/post",
    icon: FillIcon.Post,
  },
  {
    title: "meetup",
    url: "/meet-ups",
    icon: FillIcon.Calendar,
  },
  {
    title: "group",
    icon: FillIcon.Group,
    url: "/group",
  },
  {
    title: "podcast",
    icon: FillIcon.Podcasts,
    url: "/podcasts",
  },
  {
    title: "interview",
    icon: FillIcon.Interviews,
    url: "/interviews",
  },
];

const GlobalSearchBarList = ({
  searchResults,
  handleClose,
  loadMore,
  showButton,
}: GlobalSearchBarListProps) => {
  return (
    <div className="flex flex-col overflow-auto">
      {searchResults.length === 0 && (
        <p className="semibold-14 self-center px-4 text-dark-3 dark:text-light-2">
          No results
        </p>
      )}
      {searchResults.map((result) => {
        const IconComponent =
          resultInfo.find((info) => info.title === result.type)?.icon ||
          FillIcon.Post;
        const url = resultInfo.find((info) => info.title === result.type)?.url;

        return (
          <Link
            href={`${url}/${result.id}`}
            key={result.id}
            className="flex w-full cursor-pointer gap-2.5 px-4 py-3 hover:bg-light-2 dark:hover:bg-dark-4"
            onClick={() => handleClose()}
          >
            <IconComponent className="h-4 w-4 shrink-0 fill-sc-3 dark:fill-sc-4" />
            <div className="flex flex-col">
              <p className="text-xs font-bold text-sc-2 dark:text-light">
                {result.title}
              </p>
              <p className="text-[10px] font-semibold text-light-4">
                {result.type}
              </p>
            </div>
          </Link>
        );
      })}
      {showButton && (
        <button
          className="semibold-12 flex-center my-2 h-[1.625rem] shrink-0 self-center rounded-full bg-red-90 px-5 text-light"
          onClick={() => loadMore()}
        >
          Show More
        </button>
      )}
    </div>
  );
};

export default GlobalSearchBarList;
