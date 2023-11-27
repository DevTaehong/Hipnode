import React, { SetStateAction, useCallback } from "react";
import { Types } from "ably";

import {
  createMessage,
  getMessagesForChatroom,
} from "@/lib/actions/chatroom.actions";
import { uploadLivechatAttachment } from "@/utils";
import {
  loadMessagesProps,
  useDropzoneHandlerProps,
} from "@/types/chatroom.index";

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
              id: message.userId,
              username: user?.username,
              image: user?.image || "/christopher.png",
            },
            messageId: message.id,
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

export const useDropzoneHandler = ({
  setMediaType,
  setDroppedFile,
  setAttachmentPreview,
}: useDropzoneHandlerProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 1) {
        const file = acceptedFiles[0];
        const previewUrl = URL.createObjectURL(file);
        let mediaType = "";

        switch (true) {
          case file.type.startsWith("image"):
            mediaType = "image";
            break;
          case file.type.startsWith("video"):
            mediaType = "video";
            break;
          case file.type.startsWith("audio"):
            mediaType = "audio";
            break;
          case file.type.includes("application") || file.type.includes("text"):
            mediaType = "document";
            break;
          default:
            mediaType = "unknown";
            break;
        }

        setMediaType(mediaType);
        setDroppedFile(file);
        setAttachmentPreview(previewUrl);
      } else if (acceptedFiles.length > 1) {
        setMediaType("folder");
        setDroppedFile(acceptedFiles);
        setAttachmentPreview("folder");
      }
    },
    [setMediaType, setDroppedFile, setAttachmentPreview]
  );

  return onDrop;
};
