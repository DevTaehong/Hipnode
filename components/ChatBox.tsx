import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { ArrowLargeIcon, Icon, IconAlt, VoiceIcon } from "@/components/icons/outline-icons";
import ChatMessage from "@/components/ChatMessage";
import { Input } from "./ui/input";

// TODO: Replace this with real data
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
    message: "Okay, I'm going to go now bye!",
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

    <article className="mx-5 flex gap-5 pt-5">
      <section className="flex items-center gap-2 rounded-[1rem] border border-sc-5 p-3 dark:border-sc-2">
        <Icon.Link />

        <input
          id="chat-input"
          type="text"
          placeholder="Type here your message..."
          className="w-full flex-1 bg-transparent text-sc-3 outline-none dark:text-light-2"
        />

        <VoiceIcon />
      </section>
      <div>submit</div>
    </article>
  </section>
);

export default ChatBox;
