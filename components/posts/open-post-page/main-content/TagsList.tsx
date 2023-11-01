import { TagsListProps } from "@/types/posts";

const TagsList = ({ tags }: TagsListProps) => (
  <div className="flex pb-[0.875rem] pl-[4.8rem] lg:pb-[1.25rem] ">
    {tags.map((tag) => (
      <p
        key={tag}
        className="pr-[1.5rem] text-[1rem] leading-[1.5rem] text-yellow-90"
      >
        {tag}
      </p>
    ))}
  </div>
);

export default TagsList;
