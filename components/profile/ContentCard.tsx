import React from "react";
import Image from "next/image";

const ContentCard = () => {
  return (
    <div className="flex gap-3.5 rounded-[0.875rem] bg-light p-3.5 dark:bg-dark-3 md:rounded-[1rem] md:p-5">
      <section className="w-[20%] md:w-[25%]">
        <Image
          src="/postCardPlacholder.png"
          alt="content"
          width={100}
          height={100}
          className="w-full rounded-[0.25rem] border border-contentCard object-contain object-top shadow-contentCard md:rounded-[1rem]"
        />
      </section>

      <section className="w-full flex-1">
        <article>
          <div>
            <p></p>

            <div>tags</div>
          </div>

          <div>icon mobile or desktop heart</div>
        </article>

        <article>views likes comments</article>
      </section>
    </div>
  );
};

export default ContentCard;
