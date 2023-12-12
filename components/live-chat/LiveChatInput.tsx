import React from "react";
import Image from "next/image";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

import { EmojiData, handleEmojiSelect } from ".";
import OutlineIcon from "../icons/outline-icons";
import { LiveChatInputProps } from "@/types/chatroom.index";

const LiveChatInput = ({
  open,
  inputBox,
  messageText,
  handleTyping,
  handleKeyDown,
  isInputDisabled,
  showEmojiPicker,
  setShowEmojiPicker,
  setMessageText,
}: LiveChatInputProps) => {
  return (
    <div className="flex justify-between">
      <div className="flex w-full gap-1">
        <button className="flex-center" type="button" onClick={open}>
          <OutlineIcon.Link className="fill-sc-4" />
        </button>
        <textarea
          ref={inputBox}
          value={messageText}
          placeholder="Type here your message..."
          onChange={handleTyping}
          onKeyDown={handleKeyDown}
          disabled={isInputDisabled}
          className="bg-light_dark-4 z-10 h-6 w-full resize-none text-sc-4 outline-none placeholder:text-sc-4"
        />
      </div>
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
              onEmojiSelect={(emoji: EmojiData) =>
                handleEmojiSelect({
                  emoji,
                  messageText,
                  setMessageText,
                })
              }
              onClickOutside={() => setShowEmojiPicker(false)}
              perLine={7}
            />
          </div>
        )}
      </figure>
    </div>
  );
};

export default LiveChatInput;
