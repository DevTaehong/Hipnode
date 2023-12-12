import {
  FormEvent,
  useState,
  useEffect,
  useRef,
  useMemo,
  ChangeEvent,
} from "react";
import data from "@emoji-mart/data";
import { useChannel } from "ably/react";

import { useChatPageInputContext } from "@/app/contexts/ChatPageInputContext";
import useChatStore from "@/app/chatStore";
import { useChatPageContext } from "@/app/contexts/ChatPageContext";
import { adjustHeight } from "@/utils";
import { UserTyping } from "@/types/chatroom.index";
import ChatBoxInputContent from "./ChatBoxInputContent";
import { userTypingChange } from "../live-chat";

const ChatPageInput = () => {
  const { chatroomId } = useChatStore();
  const { messageText, setMessageText, handleFormSubmission } =
    useChatPageInputContext();
  const { isInputDisabled, userInfo, isLoading } = useChatPageContext();

  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [userTyping, setUserTyping] = useState<UserTyping | null>(null);
  const typingTimeoutRef = useRef<number | null>(null);
  const inputBox = useRef<HTMLTextAreaElement>(null);

  const { channel: typingChannel } = useChannel(
    "hipnode-livechat-typing-status"
  );

  const handleTyping = (e: ChangeEvent<HTMLTextAreaElement>) => {
    userTypingChange({
      e,
      setMessageText,
      typingChannel,
      userInfo,
      chatroomId,
      typingTimeoutRef,
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleFormSubmission(event);
  };

  useEffect(() => {
    if (!isInputDisabled) {
      inputBox.current?.focus();
    }
  }, [isInputDisabled]);

  useEffect(() => {
    adjustHeight(inputBox.current);
  }, [messageText]);

  const isChatroomUserTyping = useMemo(() => {
    if (!userTyping) return false;
    return (
      userTyping.isTyping &&
      userTyping.chatroomId === chatroomId &&
      userTyping.userId !== userInfo.id
    );
  }, [userTyping, chatroomId, userInfo.id]);

  const userTypingUsername = userTyping?.username;

  useChannel("hipnode-livechat-typing-status", (message) => {
    setUserTyping(message.data);
  });

  if (!chatroomId || isLoading) return null;

  return (
    <ChatBoxInputContent
      isChatroomUserTyping={isChatroomUserTyping}
      userTypingUsername={userTypingUsername}
      handleSubmit={handleSubmit}
      inputBox={inputBox}
      handleTyping={handleTyping}
      setShowEmojiPicker={setShowEmojiPicker}
      showEmojiPicker={showEmojiPicker}
      data={data}
    />
  );
};

export default ChatPageInput;
