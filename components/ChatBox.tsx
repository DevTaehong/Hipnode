import Image from "next/image";

import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLargeIcon, Icon, IconAlt, VoiceIcon } from "@/components/icons/outline-icons";
import ChatMessage from "@/components/ChatMessage";
import FillIcon from "./icons/fill-icons";

// TODO: Replace this with real data
const chatMessages = [
  {
    user: "you",
    message: "Greetings, fellow carbon-based life form! How art thou in the realm of 1s and 0s?",
  },
  {
    user: "other",
    message: "Salutations, my silicon-chip comrade! I'm currently doing the binary tango, how about you?",
  },
  {
    user: "you",
    message:
      "Ah, the binary tango, a classic dance of 10 steps forward and 1 step back. I'm waltzing along too, albeit with a few buffer overflows!",
  },
  {
    user: "other",
    message:
      "Buffer overflows, the dance move that keeps on giving! Let's hope we don't trip over any null pointers in this digital ballroom.",
  },
  {
    user: "you",
    message:
      "Absolutely! Null pointers are the banana peels of our digital dance floor. So, what's your next move in this grand algorithmic dance?",
  },
  {
    user: "other",
    message:
      "I'm thinking of attempting the 'Funky Function Flip.' It's got a 50% chance of impressing the virtual audience or crashing the virtual chandelier. High stakes, you know!",
  },
  {
    user: "you",
    message:
      "A daring choice! Break a virtual leg, my friend. I'll be here, debugging and providing virtual applause. Until our next debugging disco, cheerio Christopher!",
  },
  {
    user: "other",
    message: "Cheerio Christopher!",
  },
];

const ChatBox = () => (
  <section className="w-[370px] rounded-[1rem] bg-light pb-5 pt-4 dark:bg-dark-4">
    <article className="mx-5 flex items-center justify-between border-b border-sc-6 pb-3 dark:border-sc-2">
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
            Christopher the Great
          </h3>
          <p className="text-[0.625rem] font-semibold leading-[160%] text-green">Online</p>
        </div>
      </section>

      <section className="flex items-center gap-4">
        <IconAlt.Expand />
        <ArrowLargeIcon.Down />
      </section>
    </article>

    <ScrollArea className="mx-2 h-[200px] px-2">
      {chatMessages.map((chatMessage, index) => (
        <ChatMessage
          key={index}
          user={chatMessage.user}
          message={chatMessage.message}
        />
      ))}
    </ScrollArea>

    <article className="mx-5 flex items-center justify-between gap-5 pt-5">
      <section className="flex w-full items-center gap-2 rounded-[1rem] border border-sc-5 p-3 dark:border-sc-2">
        <Icon.Link />

        <input
          id="chat-input"
          type="text"
          placeholder="Type here your message..."
          className="w-full flex-1 bg-transparent text-sc-3 outline-none dark:text-light-2"
        />

        <VoiceIcon />
      </section>

      <FillIcon.Send className="cursor-pointer fill-sc-2 dark:fill-light-2" />
    </article>
  </section>
);

export default ChatBox;
