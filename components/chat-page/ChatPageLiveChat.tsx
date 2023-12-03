import React, {
  useState,
  useEffect,
  useRef,
  FormEvent,
  KeyboardEvent,
} from "react";
import { useDropzone } from "react-dropzone";
import { useChannel } from "ably/react";

import {
  API_RESULT,
  liveChatSubmission,
  loadMessages,
  useDropzoneHandler,
} from "../live-chat";
import useChatStore from "@/app/chatStore";
import { ChatMessage, ChatPageLiveChatProps } from "@/types/chatroom.index";
import { ChatPageChatBox } from ".";
import HoverScreen from "../live-chat/HoverScreen";

const ChatPageLiveChat = ({
  userInfo,
  onlineUsers,
  otherUser,
  defaultChatroomId,
  messages,
  setMessages,
}: ChatPageLiveChatProps) => {
  const [messageText, setMessageText] = useState("");
  const [droppedFile, setDroppedFile] = useState<File | File[] | null>(null);
  const inputBox = useRef<HTMLInputElement>(null);
  const messageTextIsEmpty = messageText.trim().length === 0;
  const { chatroomUsers, chatroomId, setChatroomUsers, setChatroomId } =
    useChatStore();

  const { channel } = useChannel("hipnode-livechat", (message: ChatMessage) => {
    const channelId = message.data.chatroomId;
    if (channelId === chatroomId) {
      setMessages((prevMessages) => [...prevMessages.slice(-199), message]);
    }
  });

  const onDrop = useDropzoneHandler({
    setDroppedFile,
  });

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true,
  });

  const idForChatroom = chatroomId ?? defaultChatroomId;
  const usersForChatroom = chatroomUsers ?? [userInfo, otherUser];

  useEffect(() => {
    loadMessages({
      setMessages,
      chatroomId: idForChatroom,
      chatroomUsers: usersForChatroom,
    });
  }, [chatroomId, chatroomUsers]);

  useEffect(() => {
    if (chatroomId === null || !chatroomUsers.length) {
      setChatroomId(defaultChatroomId);
      setChatroomUsers([userInfo, otherUser]);
    }
  }, []);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      handleFormSubmission(event);
    }
  };

  const currentUser = userInfo;

  const handleFormSubmission = async (
    event: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    if (!messageTextIsEmpty || droppedFile) {
      try {
        const result = await liveChatSubmission({
          event,
          messageText,
          droppedFile,
          channel,
          chatroomId,
          inputBox,
          currentUser,
        });
        if (result === API_RESULT.SUCCESS) {
          setMessageText("");
          setDroppedFile(null);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  };

  return (
    <section
      className="relative flex h-full w-full max-w-[62.5rem]"
      {...getRootProps()}
    >
      {isDragActive && <HoverScreen />}
      <ChatPageChatBox
        onlineUsers={onlineUsers}
        messages={messages}
        inputProps={[getInputProps()]}
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

export default ChatPageLiveChat;
