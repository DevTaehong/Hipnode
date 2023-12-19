import { useCallback, ChangeEvent, MutableRefObject } from "react";
import { Types } from "ably";
import DOMPurify from "dompurify";

import {
  createMessage,
  getMessagesForChatroom,
} from "@/lib/actions/chatroom.actions";
import { uploadLivechatAttachment, getMediaType, adjustHeight } from "@/utils";
import {
  ChatroomUser,
  LiveChatSubmissionProps,
  handleEmojiSelectProps,
  loadMessagesProps,
  useDropzoneHandlerProps,
} from "@/types/chatroom.index";

export enum API_RESULT {
  SUCCESS,
  FAILURE,
}

export const loadMessages = async ({
  chatroomId,
  chatroomUsers,
}: loadMessagesProps) => {
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
      return {
        messages: transformedMessages,
        success: API_RESULT.SUCCESS,
      };
    } catch (error) {
      console.error("Error fetching messages for chatroom:", error);
    }
  }
};

export const liveChatSubmission = async (args: LiveChatSubmissionProps) => {
  const { messageText, droppedFile, channel, chatroomId, currentUser } = args;

  const mediaType = droppedFile ? getMediaType(droppedFile) : null;

  let attachmentURL = null;
  const messageContent = messageText.trim();
  if (droppedFile) {
    try {
      const uploadResult = await uploadLivechatAttachment(droppedFile);
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
      attachment: attachmentURL,
      attachmentType: mediaType,
      createdAt: new Date(),
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
        const mediaType = getMediaType(file);
        if (mediaType === "unknown") return;
        setDroppedFile(file);
      } else if (acceptedFiles.length > 1) {
        setDroppedFile(acceptedFiles);
      }
    },
    [setDroppedFile]
  );

  return onDrop;
};

export const userTypingChange = ({
  e,
  setMessageText,
  typingChannel,
  userInfo,
  chatroomId,
  typingTimeoutRef,
}: {
  e: ChangeEvent<HTMLTextAreaElement>;
  setMessageText: (messageText: string) => void;
  typingChannel: Types.RealtimeChannelPromise;
  userInfo: ChatroomUser;
  chatroomId: number | null;
  typingTimeoutRef: MutableRefObject<number | null>;
}) => {
  const newMessageText = e.target.value;
  setMessageText(newMessageText);
  adjustHeight(e.target);

  if (typingChannel) {
    typingChannel.publish("typing-status", {
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
    typingChannel.publish("typing-status", {
      isTyping: false,
      userId: userInfo.id,
      username: userInfo.username,
      chatroomId,
    });
  }, 1000);
};

export const isOnlyEmoji = (string: string) => {
  const emojiRegex = /^(\p{Emoji_Presentation}|\p{Extended_Pictographic})+$/u;
  return emojiRegex.test(string);
};

export const isUrl = (str: string) => {
  const urlRegex =
    /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\w-.,@?^=%&:/~+#]*[\w-@?^=%&/~+#])?$/;
  return urlRegex.test(str);
};

export const extractUrls = (text: string) => {
  const urlRegex = /https?:\/\/[^\s]+/g;
  let match;
  let lastIndex = 0;
  const segments = [];

  while ((match = urlRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({
        text: text.substring(lastIndex, match.index),
        isUrl: false,
      });
    }
    segments.push({ text: match[0], isUrl: true });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    segments.push({ text: text.substring(lastIndex), isUrl: false });
  }

  return segments;
};

export const formatTextWithLineBreaks = (text: string) => {
  const lineBreaksHtml = text.replace(/\n/g, "<br>");
  const sanitizedHtml = DOMPurify.sanitize(lineBreaksHtml);
  return { __html: sanitizedHtml };
};

export const handleEmojiSelect = ({
  emoji,
  messageText,
  setMessageText,
}: handleEmojiSelectProps) => {
  const emojiCharacter = emoji.native;
  const currentValue = messageText;
  const updatedValue = currentValue + emojiCharacter;
  setMessageText(updatedValue);
};

export const findAudioDuration = (url: string) => {
  const match = url.match(/duration-(\d+)/);
  const extractedDuration = match ? parseInt(match[1], 10) : 0;
  return extractedDuration;
};

export const getStyling = (smallChatBox: boolean) => ({
  outerDivStyles: smallChatBox
    ? "gap-1"
    : "gap-3 xs:flex-row md:flex-col lg:flex-row",
  imageDivStyles: smallChatBox
    ? "w-full max-h-[7rem]"
    : "xs:max-h-[7rem] xs:max-w-[8.2rem] md:max-w-full md:max-h-[18rem] lg:max-h-[7rem] lg:max-w-[8.2rem]",
  imageStyles: !smallChatBox && "w-full xs:w-[8.2rem] md:w-full lg:w-[8.2rem]",
});
