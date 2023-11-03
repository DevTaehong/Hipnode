const Tag = ({ text }: { text: string }) => {
  return (
    <div className="rounded-full bg-sc-6 px-2.5 py-1 text-[0.5625rem] leading-[0.875rem] text-sc-4 dark:bg-dark-4 dark:text-sc-5 md:text-[0.625rem] md:font-semibold md:leading-[1rem]">
      {text}
    </div>
  );
};

export default Tag;
