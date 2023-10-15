import { ScrollArea } from "@/components/ui/scroll-area";

const ChatBox = () => {
  return (
    <section className="p-5">
      <article>Johnathan Swift</article>

      <ScrollArea>text messages goes here</ScrollArea>

      <article>Input messages goes here</article>
    </section>
  );
};

export default ChatBox;
