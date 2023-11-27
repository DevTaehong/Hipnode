import React, { Dispatch, SetStateAction } from "react";
import {
  createMessage,
  getMessagesForChatroom,
} from "@/lib/actions/chatroom.actions";
import { uploadLivechatAttachment } from "@/utils";
import { ChatMessage } from "@/types/chatroom.index";
import { Types } from "ably";

interface loadMessagesProps {
  setMessages: Dispatch<SetStateAction<ChatMessage[]>>;
  chatroomId: number | null;
  chatroomUsers: any[];
}

export const loadMessages = async ({
  setMessages,
  chatroomId,
  chatroomUsers,
}: loadMessagesProps) => {
  setMessages([]);
  if (chatroomId !== null) {
    try {
      const messages = await getMessagesForChatroom(chatroomId);
      const transformedMessages = messages.map((message) => {
        const user = chatroomUsers.find((u) => u.id === message.userId);
        return {
          data: {
            user: {
              id: message.userId.toString(),
              username: user?.username || "Unknown User",
              image: user?.image || "/public/christopher.png",
            },
            attachment: message.attachment || null,
            attachmentType: message.attachmentType || null,
            text: message.text || null,
          },
        };
      });
      setMessages(transformedMessages);
    } catch (error) {
      console.error("Error fetching messages for chatroom:", error);
    }
  }
};

interface CurrentUser {
  id: number | null;
  username: string;
  image: string;
}

interface LiveChatSubmissionProps {
  event:
    | React.FormEvent<HTMLFormElement>
    | React.KeyboardEvent<HTMLInputElement>;
  messageText: string;
  setMessageText: React.Dispatch<React.SetStateAction<string>>;
  droppedFile: File | File[] | null;
  setDroppedFile: React.Dispatch<SetStateAction<File | File[] | null>>;
  setAttachmentPreview: React.Dispatch<React.SetStateAction<string | null>>;
  setMediaType: React.Dispatch<SetStateAction<string>>;
  mediaType: string | null;
  channel: Types.RealtimeChannelPromise;
  chatroomId: number | null;
  inputBox: React.RefObject<HTMLFormElement | HTMLInputElement>;
  currentUser: CurrentUser;
}

export const liveChatSubmission = async (args: LiveChatSubmissionProps) => {
  const {
    event,
    messageText,
    setMessageText,
    droppedFile,
    setDroppedFile,
    setAttachmentPreview,
    setMediaType,
    mediaType,
    channel,
    chatroomId,
    inputBox,
    currentUser,
  } = args;
  event.preventDefault();

  let attachmentURL = null;
  const messageContent = messageText.trim();
  if (droppedFile) {
    try {
      const uploadResult = await uploadLivechatAttachment([droppedFile]);
      attachmentURL = uploadResult.publicURL;
      setAttachmentPreview(null);
      setDroppedFile(null);
    } catch (error) {
      console.error("Error uploading:", error);
      return;
    }
  }

  if (attachmentURL || messageContent.length > 0) {
    const chatMessage = {
      text: messageContent || null,
      user: currentUser,
      chatroomId,
      attachment: attachmentURL || null,
      attachmentType: mediaType || null,
    };

    try {
      if (chatroomId && currentUser.id) {
        await channel.publish("chat-message", chatMessage);
        await createMessage({
          text: chatMessage.text,
          userId: currentUser.id,
          chatroomId,
          attachment: chatMessage.attachment,
          attachmentType: chatMessage.attachmentType,
        });
        setMessageText("");
        setMediaType("");
        inputBox.current?.focus();
      }
    } catch (error) {
      console.error("Error sending or creating message:", error);
    }
  }
};
