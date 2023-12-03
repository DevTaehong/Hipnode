import Image from "next/image";
import { FormEvent, useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

import { ChatPageInputProps } from "@/types/chatroom.index";
import FillIcon from "../icons/fill-icons";
import OutlineIcon from "../icons/outline-icons";
import AttachmentPreview from "../live-chat/AttachmentPreview";

type EmojiData = {
  native: string;
};

const ChatPageInput = ({
  inputProps,
  open,
  droppedFile,
  setDroppedFile,
  messageText,
  setMessageText,
  handleKeyDown,
  handleFormSubmission,
  inputBox,
}: ChatPageInputProps) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const handleEmojiSelect = (emoji: EmojiData) => {
    const emojiCharacter = emoji.native;
    const currentValue = messageText;
    const updatedValue = currentValue + emojiCharacter;
    setMessageText(updatedValue);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleFormSubmission(event);
  };

  return (
    <div className="bg-light_dark-4 flex justify-between px-8 pb-9 pt-4">
      <div className="flex w-full flex-col items-center">
        {droppedFile && (
          <div className="flex h-full max-h-[40rem] w-fit max-w-[25rem] self-start">
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
            <input
              {...inputProps}
              ref={inputBox}
              value={messageText}
              className="bg-light-2_dark-4 w-full text-sc-4 outline-none placeholder:text-sc-4"
              placeholder="Type your message here..."
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div className="flex gap-2.5">
              <div className="relative flex h-6 w-6 cursor-pointer items-center justify-center">
                <Image
                  src="/smiley.svg"
                  alt="smiley"
                  width={24}
                  height={24}
                  className="rounded-full"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                />
                {showEmojiPicker && (
                  <div className="absolute bottom-[2.5rem] right-0">
                    <Picker
                      data={data}
                      onEmojiSelect={handleEmojiSelect}
                      onClickOutside={() => setShowEmojiPicker(false)}
                      perLine={10}
                    />
                  </div>
                )}
              </div>
              <button className="flex" type="button">
                <OutlineIcon.Voice className="stroke-sc-4" />
              </button>
            </div>
          </div>
          <button
            className="flex cursor-pointer"
            type="submit"
            disabled={messageText === "" && !droppedFile}
          >
            <FillIcon.Send className="fill-sc-2 dark:fill-light-2" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPageInput;
