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

type EmojiData = {
  native: string;
};

const ChatPageInput = () => {
  const { chatroomId } = useChatStore();
  const { messageText, setMessageText, handleFormSubmission } =
    useChatPageInputContext();
  const { isInputDisabled, userInfo } = useChatPageContext();

  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const typingTimeoutRef = useRef<number | null>(null);
  const inputBox = useRef<HTMLTextAreaElement>(null);
  const [userTyping, setUserTyping] = useState<UserTyping | null>(null);

  const handleEmojiSelect = (emoji: EmojiData) => {
    const emojiCharacter = emoji.native;
    const currentValue = messageText;
    const updatedValue = currentValue + emojiCharacter;
    setMessageText(updatedValue);
  };

  const { channel } = useChannel("hipnode-livechat-typing-status");

  const handleTyping = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newMessageText = e.target.value;
    setMessageText(newMessageText);
    adjustHeight(e.target);

    if (channel) {
      channel.publish("typing-status", {
        isTyping: true,
        userId: userInfo.id,
        username: userInfo.username,
        chatroomId,
      });
    }

    if (typingTimeoutRef.current !== null) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = window.setTimeout(() => {
      channel.publish("typing-status", {
        isTyping: false,
        userId: userInfo.id,
        username: userInfo.username,
        chatroomId,
      });
    }, 1000);
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

  if (!chatroomId) return null;

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
      handleEmojiSelect={handleEmojiSelect}
    />
  );
};

export default ChatPageInput;
