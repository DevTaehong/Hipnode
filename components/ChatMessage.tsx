import Image from "next/image";

interface ChatMessageProps {
  user: string;
  message: string;
}

const ChatMessage = ({ user, message }: ChatMessageProps) => {
  return (
    <section className={`mt-5 flex w-full items-start gap-2 px-1 ${user === "you" ? "flex-row-reverse" : ""}`}>
      <Image
        src="/christopher.png"
        alt="picture of user"
        width={40}
        height={40}
        className="rounded-full"
      />

      <article
        className={`rounded-b-[0.5rem] rounded-l-[0.5rem] p-3 text-[1rem] font-semibold leading-[150%] ${
          user === "you"
            ? "rounded-l-[0.5rem] rounded-tr-[0.125rem] bg-red-80 text-light"
            : "rounded-r-[0.5rem] rounded-tl-[0.125rem] bg-red-10 text-red-80"
        }`}
      >
        {message}
      </article>
    </section>
  );
};

export default ChatMessage;
