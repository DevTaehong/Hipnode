import { PostLabelProps } from "@/types/homepage";

const PostLabels = ({ tags }: PostLabelProps) => (
  <section>
    <ul className="flex justify-start gap-[0.625rem]">
      {tags.slice(0, 3).map?.((item, index) => (
        <li
          className="semibold-10 w-fit  rounded-full bg-light-3 px-[0.625rem] py-1 leading-[0.875rem] dark:bg-dark-4 dark:text-sc-5"
          key={index}
        >
          {item}
        </li>
      ))}
    </ul>
  </section>
);
export default PostLabels;
