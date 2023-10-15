import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { ArrowLargeIcon, IconAlt } from "@/components/icons/outline-icons";

const ChatBox = () => {
  return (
    <section className="w-[350px] rounded-[1rem] bg-light px-5 pb-5 pt-4 dark:bg-dark-4">
      {/* Top Area */}
      <article className="flex items-center justify-between border-b border-sc-6 pb-3 dark:border-sc-2">
        <section className="flex items-center gap-2">
          <Image
            src="/christopher.png"
            alt="picture of user"
            width={40}
            height={40}
            className="rounded-full"
          />

          <div>
            <h3 className="text-[1.125rem] font-semibold leading-[144%] text-sc-2 dark:text-light-2">
              Johnathon Swift
            </h3>
            <p className="text-[0.625rem] font-semibold leading-[160%] text-green">Online</p>
          </div>
        </section>

        <section className="flex items-center gap-4">
          <IconAlt.Expand />
          <ArrowLargeIcon.Down />
        </section>
      </article>

      {/* Middle Area */}
      <ScrollArea>text messages goes here</ScrollArea>

      {/* Bottom Area */}
      <article>Input messages goes here</article>
    </section>
  );
};

export default ChatBox;
