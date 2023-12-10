import Image from "next/image";
import Picker from "@emoji-mart/react";

import FillIcon from "../icons/fill-icons";
import OutlineIcon from "../icons/outline-icons";
import AttachmentPreview from "../live-chat/AttachmentPreview";
import { useChatPageInputContext } from "@/app/contexts/ChatPageInputContext";
import { useChatPageContext } from "@/app/contexts/ChatPageContext";
import {
  FormEvent,
  RefObject,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";

interface ChatBoxInputContentProps {
  isChatroomUserTyping: boolean;
  userTypingUsername: string | undefined;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  inputBox: RefObject<HTMLTextAreaElement>;
  handleTyping: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  setShowEmojiPicker: Dispatch<SetStateAction<boolean>>;
  showEmojiPicker: boolean;
  data: object;
  handleEmojiSelect: (emoji: any) => void;
}

const ChatBoxInputContent = ({
  isChatroomUserTyping,
  userTypingUsername,
  handleSubmit,
  inputBox,
  handleTyping,
  setShowEmojiPicker,
  showEmojiPicker,
  data,
  handleEmojiSelect,
}: ChatBoxInputContentProps) => {
  const {
    getInputProps,
    open,
    droppedFile,
    setDroppedFile,
    messageText,
    handleKeyDown,
  } = useChatPageInputContext();
  const { isInputDisabled } = useChatPageContext();

  return (
    <section className="relative flex justify-between border-t border-sc-6 bg-light px-4 pb-9 pt-4 dark:border-dark-4 dark:bg-dark-2 md:px-8 md:dark:bg-dark-3">
      {isChatroomUserTyping && (
        <p className=" absolute flex w-full translate-x-[-1rem] translate-y-[-3rem] p-2 text-sc-3  dark:text-light-2 md:translate-x-[-2rem]">
          {userTypingUsername} is typing...
        </p>
      )}
      <div className="flex w-full flex-col items-center">
        {droppedFile && (
          <div className="flex h-full w-fit self-start">
            <AttachmentPreview
              droppedFile={droppedFile}
              setDroppedFile={setDroppedFile}
              chatPage={true}
            />
          </div>
        )}
        <form
          className="flex w-full items-center gap-5"
          onSubmit={handleSubmit}
        >
          <div className="flex-center bg-light-2_dark-4 flex w-full gap-2.5 rounded-2xl border border-sc-5 px-4 py-5 dark:border-sc-2">
            <button className="flex-center" type="button" onClick={open}>
              <OutlineIcon.Link />
            </button>
            <textarea
              {...getInputProps}
              ref={inputBox}
              value={messageText}
              className="bg-light-2_dark-4 h-6 max-h-[4.5rem] w-full resize-none text-sc-4 outline-none placeholder:text-sc-4"
              placeholder="Type your message here..."
              disabled={isInputDisabled}
              onChange={(e) => {
                handleTyping(e);
              }}
              onKeyDown={handleKeyDown}
            />
            <div className="flex gap-2.5">
              <figure className="relative flex h-6 w-6 cursor-pointer items-center justify-center">
                <Image
                  src="/smiley.svg"
                  alt="smiley"
                  width={24}
                  height={24}
                  className="rounded-full"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                />
                {showEmojiPicker && (
                  <div className="absolute bottom-[2.5rem] right-[-5.5rem]">
                    <Picker
                      data={data}
                      onEmojiSelect={handleEmojiSelect}
                      onClickOutside={() => setShowEmojiPicker(false)}
                      perLine={7}
                    />
                  </div>
                )}
              </figure>
              <button className="flex" type="button">
                <OutlineIcon.Voice className="stroke-sc-4" />
              </button>
            </div>
          </div>
          <button
            className="flex cursor-pointer"
            type="submit"
            disabled={(messageText === "" && !droppedFile) || isInputDisabled}
          >
            <FillIcon.Send className="fill-sc-2 dark:fill-light-2" />
          </button>
        </form>
      </div>
    </section>
  );
};

export default ChatBoxInputContent;
