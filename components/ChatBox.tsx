import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { ArrowLargeIcon, IconAlt } from "@/components/icons/outline-icons";

const chatMessages = [
  {
    user: "you",
    message: "Hello, how are you?",
  },
  {
    user: "other",
    message: "I'm fine, thank you. What about you?",
  },
  {
    user: "you",
    message: "I'm great, thanks for asking",
  },
  {
    user: "other",
    message: "I'm fine, thank you. What about you?2222",
  },
];

const ChatBox = () => {
  const user = "you";

  return (
    <section className="w-[350px] rounded-[1rem] bg-light px-5 pb-5 pt-4 dark:bg-dark-4">
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
      <ScrollArea className="mt-5">
        {/* left side chat */}
        <section className="flex w-full items-start gap-2">
          <Image
            src="/christopher.png"
            alt="picture of user"
            width={40}
            height={40}
            className="rounded-full"
          />

          <article className="rounded-b-[0.5rem] rounded-r-[0.5rem] rounded-tl-[0.125rem] bg-red-10 p-3 text-[1rem] font-semibold leading-[150%] text-red-80">
            Whats the update?
          </article>
        </section>

        {/* right side chat */}
        <section className="mt-5 flex w-full flex-row-reverse items-start gap-2">
          <Image
            src="/christopher.png"
            alt="picture of user"
            width={40}
            height={40}
            className="rounded-full"
          />

          <article className="rounded-b-[0.5rem] rounded-l-[0.5rem] rounded-tr-[0.125rem] bg-red-80 p-3 text-[1rem] font-semibold leading-[150%] text-light">
            Whats the update?
          </article>
        </section>

        {/* Both combined based on type of user */}
      </ScrollArea>

      {/* Bottom Area */}
      <article>Input messages goes here</article>
    </section>
  );
};

export default ChatBox;
