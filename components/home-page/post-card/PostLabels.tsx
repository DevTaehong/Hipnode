import { PostLabelProps } from "@/types/homepage";

const PostLabels = ({ tags }: PostLabelProps) => (
  <section>
    <ul className="flex justify-start gap-[0.625rem] pt-[0.625rem]">
      {tags.map((item, index) => (
        <li
          className="w-full max-w-[3rem] rounded-md  bg-light-3 px-[0.625rem] py-1 text-[0.563rem] leading-[0.875rem] dark:bg-dark-4 dark:text-sc-5"
          key={index}
        >
          {item}
        </li>
      ))}
    </ul>
  </section>
);
export default PostLabels;
