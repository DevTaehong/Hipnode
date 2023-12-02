import { ChatPageChatBoxProps } from "@/types/chatroom.index";
import { ChatBoxHeader, ChatPageMessageList } from ".";
import useChatStore from "@/app/chatStore";
import ChatPageInput from "./ChatPageInput";

const ChatPageChatBox = ({
  onlineUsers,
  messages,
  inputProps,
  open,
  droppedFile,
  setDroppedFile,
  messageText,
  setMessageText,
  handleKeyDown,
  handleFormSubmission,
  inputBox,
}: ChatPageChatBoxProps) => {
  const { chatroomUsers } = useChatStore();
  const otherUser = chatroomUsers[1];

  if (!otherUser) return null;

  const isOtherUserOnline = onlineUsers
    ? onlineUsers.includes(otherUser.id)
    : false;

  return (
    <section className="flex w-full flex-col border-b border-l border-sc-6 dark:border-dark-4">
      <ChatBoxHeader otherUser={otherUser} isUserOnline={isOtherUserOnline} />
      <ChatPageMessageList messages={messages} />
      <ChatPageInput
        inputProps={inputProps}
        open={open}
        droppedFile={droppedFile}
        setDroppedFile={setDroppedFile}
        messageText={messageText}
        setMessageText={setMessageText}
        handleKeyDown={handleKeyDown}
        handleFormSubmission={handleFormSubmission}
        inputBox={inputBox}
      />
    </section>
  );
};

export default ChatPageChatBox;
