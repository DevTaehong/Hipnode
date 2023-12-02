import { useCallback } from "react";

import {
  createMessage,
  getMessagesForChatroom,
} from "@/lib/actions/chatroom.actions";
import { uploadLivechatAttachment, getMediaType } from "@/utils";
import {
  LiveChatSubmissionProps,
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
            createdAt: message.createdAt,
          },
        };
      });
      setMessages(transformedMessages);
    } catch (error) {
      console.error("Error fetching messages for chatroom:", error);
    }
  }
};

export enum API_RESULT {
  SUCCESS,
  FAILURE,
}

export const liveChatSubmission = async (args: LiveChatSubmissionProps) => {
  const {
    event,
    messageText,
    droppedFile,
    channel,
    chatroomId,
    inputBox,
    currentUser,
  } = args;
  event.preventDefault();

  const mediaType = droppedFile ? getMediaType(droppedFile) : null;

  let attachmentURL = null;
  const messageContent = messageText.trim();
  if (droppedFile) {
    try {
      const uploadResult = await uploadLivechatAttachment([droppedFile]);
      attachmentURL = uploadResult.publicURL;
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
      attachmentType: mediaType,
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
        inputBox.current?.focus();
        return API_RESULT.SUCCESS;
      }
    } catch (error) {
      console.error("Error sending or creating message:", error);
      return API_RESULT.FAILURE;
    }
  }
};

export const useDropzoneHandler = ({
  setDroppedFile,
}: useDropzoneHandlerProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 1) {
        const file = acceptedFiles[0];
        setDroppedFile(file);
      } else if (acceptedFiles.length > 1) {
        setDroppedFile(acceptedFiles);
      }
    },
    [setDroppedFile]
  );

  return onDrop;
};
