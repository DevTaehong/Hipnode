import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useState } from "react";

import MessageAttachment from "../live-chat/MessageAttachment";
import MessageContent from "./MessageContent";
import useChatStore from "@/app/chatStore";
import { ChatMessage } from "@/types/chatroom.index";
import { formatChatBoxDate } from "@/utils";
import { isOnlyEmoji } from "../live-chat";
import { useChatPageContext } from "@/app/contexts/ChatPageContext";

const ChatBoxMessage = ({ message }: { message: ChatMessage }) => {
  const { handleDeleteClick } = useChatPageContext();
  const { chatroomUsers, chatroomId, setChatroomId } = useChatStore();
  const [hover, setHover] = useState(false);

  const {
    data: {
      user: { username, image, id },
      messageId,
      createdAt,
      text,
    },
  } = message;

  const isStringSingleEmoji = text ? isOnlyEmoji(text) : false;

  const fontSize = isStringSingleEmoji ? "text-5xl" : "regular-16 ";

  const chatboxDate = createdAt ? formatChatBoxDate(createdAt) : "";

  const currentUserId = chatroomUsers[0].id;

  const isMessageFromCurrentUser = id === currentUserId;

  const calculateDivStyles = () => {
    if (isStringSingleEmoji) {
      return `bg-none p-1 ${isMessageFromCurrentUser ? "self-end" : ""}`;
    }
    return isMessageFromCurrentUser
      ? "bg-red-80 text-white self-end rounded-l-lg p-3.5"
      : "bg-red-10 text-red-80 rounded-r-lg p-3.5";
  };

  const messageAlign = isMessageFromCurrentUser
    ? "self-end flex-row-reverse"
    : "self-start flex-row";

  const displayName = id === currentUserId ? "You" : username;

  const messageHasAttachment = message.data.attachment;

  const handleDelete = () => {
    if (typeof messageId === "number") {
      handleDeleteClick({ messageId });
    } else {
      console.log("here");
    }
  };

  const onHover = () => {
    setHover(true);
    if (typeof messageId !== "number") {
      setChatroomId(chatroomId);
    }
  };

  return (
    <>
      <li
        className={`${messageAlign} flex w-full gap-2.5 break-words`}
        key={messageId}
      >
        {currentUserId !== id && (
          <figure className="flex h-10 max-h-[2.5rem] min-h-[2.5rem] w-10 min-w-[2.5rem] max-w-[2.5rem]">
            <Image
              src={image}
              alt={`Profile image for ${username}`}
              height={40}
              width={40}
              className="rounded-full"
            />
          </figure>
        )}
        <div
          className="flex max-w-full flex-col gap-1.5"
          onMouseEnter={onHover}
          onMouseLeave={() => setHover(false)}
        >
          <figure className="flex w-full max-w-[31.7rem] flex-col">
            {hover && isMessageFromCurrentUser && (
              <div className="relative top-6 flex w-20 self-end">
                <Popover>
                  <PopoverTrigger>
                    <div className="absolute right-2 z-10 flex translate-y-2 bg-red-80/80 text-2xl text-white">
                      <IoIosArrowDown />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="h-fit w-fit translate-x-3.5 translate-y-[2rem] self-end p-0">
                    <div className="absolute w-fit bg-light dark:bg-dark-2">
                      <Dialog>
                        <DialogTrigger className="w-full">
                          <p className="cursor-pointer p-2 text-sc-4 hover:bg-light-2 dark:hover:bg-dark-4">
                            Edit
                          </p>
                        </DialogTrigger>
                        <DialogContent>Edit screen</DialogContent>
                      </Dialog>
                      <Dialog>
                        <DialogTrigger className="w-full">
                          <p className="cursor-pointer p-2 text-sc-4 hover:bg-light-2 dark:hover:bg-dark-4">
                            Delete
                          </p>
                        </DialogTrigger>
                        <DialogContent className="w-fit border-0 p-0">
                          <ul className="flex flex-col items-center gap-4 rounded-lg bg-light p-4 dark:bg-dark-2">
                            <DialogClose>
                              <li
                                className="flex w-40 cursor-pointer justify-center rounded-full border border-sc-4 py-2 text-xl text-sc-4 hover:bg-red-80 hover:text-white"
                                onClick={handleDelete}
                              >
                                Delete?
                              </li>
                            </DialogClose>
                            <DialogClose>
                              <li className="w-40 rounded-full border border-sc-4 py-2 text-xl text-sc-4 hover:bg-red-80 hover:text-white">
                                Cancel
                              </li>
                            </DialogClose>
                          </ul>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            )}
            <div
              className={`flex flex-col ${
                messageHasAttachment
                  ? isMessageFromCurrentUser
                    ? "w-fit self-end"
                    : "w-fit"
                  : "w-auto"
              }`}
            >
              <div className="flex justify-between gap-2">
                <p className="semibold-16 text-sc-2_light-2">{displayName}</p>
                <p className="semibold-16 text-sc-4">{chatboxDate}</p>
              </div>
              <div className={`flex ${text && "mb-2"}`}>
                <MessageAttachment
                  message={message}
                  chatPage={true}
                  isMessageFromCurrentUser={isMessageFromCurrentUser}
                />
              </div>
            </div>
            {text && (
              <MessageContent
                additionalStyles={calculateDivStyles()}
                text={text}
                fontSize={fontSize}
              />
            )}
          </figure>
        </div>
      </li>
    </>
  );
};

export default ChatBoxMessage;
