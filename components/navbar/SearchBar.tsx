import OutlineIcons from "@/components/icons/outline-icons";
import { Input } from "@/components/ui/input";

const SearchBar = () => {
  return (
    <div className="hidden w-full max-w-[27.5rem] items-center gap-2 rounded-lg bg-light-2 px-5 py-2 dark:bg-dark-4 lg:flex">
      <Input
        type="text"
        placeholder="Type here to search..."
        className="no-focus border-none bg-light-2 shadow-none outline-none dark:bg-dark-4 dark:text-white"
      />

      <OutlineIcons.Search className="cursor-pointer stroke-sc-4" />
    </div>
  );
};

export default SearchBar;
