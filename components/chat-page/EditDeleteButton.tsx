import { Dispatch, SetStateAction, ChangeEvent } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from "../ui/dialog";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { IoIosArrowDown } from "react-icons/io";

interface EditDeleteButtonProps {
  displayText: string | null;
  setTextareaValue: Dispatch<SetStateAction<string | null>>;
  textareaValue: string | null;
  handleDelete: () => void;
  handleTextareaChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  handleEdit: () => void;
  smallChatBox?: boolean;
}

const EditDeleteButton = ({
  displayText,
  setTextareaValue,
  textareaValue,
  handleDelete,
  handleTextareaChange,
  handleEdit,
  smallChatBox = false,
}: EditDeleteButtonProps) => {
  return (
    <div className="relative top-6 flex w-20 self-end">
      <Popover>
        <PopoverTrigger>
          <div
            className={`absolute right-2 z-10 flex ${
              smallChatBox ? "translate-y-[-1.3rem]" : "translate-y-2"
            } bg-red-80/80 text-2xl text-white`}
          >
            <IoIosArrowDown />
          </div>
        </PopoverTrigger>
        <PopoverContent
          className={`h-fit w-fit translate-x-3.5 ${
            smallChatBox ? "translate-y-0" : "translate-y-[2rem]"
          }  self-end p-0`}
        >
          <div className="absolute w-fit bg-light dark:bg-dark-2">
            {displayText && (
              <Dialog>
                <DialogTrigger className="w-full">
                  <p
                    className="cursor-pointer p-2 text-sc-4 hover:bg-light-2 hover:text-red-60 dark:hover:bg-dark-4"
                    onClick={() => setTextareaValue(displayText)}
                  >
                    Edit
                  </p>
                </DialogTrigger>
                <DialogContent className="w-fit border-0 p-0">
                  <div className="flex flex-col items-center gap-5 rounded-lg bg-light p-5 dark:bg-dark-2">
                    <textarea
                      className="selected:border-red-80 w-60 resize-none rounded-lg border border-sc-4 bg-light p-2 text-sc-4 outline-none dark:bg-dark-2"
                      value={textareaValue || ""}
                      onChange={handleTextareaChange}
                    />
                    <DialogClose>
                      <button
                        className="flex w-60 cursor-pointer justify-center rounded-full border border-sc-4 py-2 text-xl text-sc-4 hover:bg-red-80 hover:text-white "
                        onClick={handleEdit}
                      >
                        Edit
                      </button>
                    </DialogClose>

                    <DialogClose>
                      <button
                        className="flex w-60 cursor-pointer justify-center rounded-full border border-sc-4 py-2 text-xl text-sc-4 hover:bg-red-80 hover:text-white"
                        onClick={() => setTextareaValue(displayText)}
                      >
                        Cancel
                      </button>
                    </DialogClose>
                  </div>
                </DialogContent>
              </Dialog>
            )}
            <Dialog>
              <DialogTrigger className="w-full">
                <p className="cursor-pointer p-2 text-sc-4 hover:bg-light-2 hover:text-red-60 dark:hover:bg-dark-4">
                  Delete
                </p>
              </DialogTrigger>
              <DialogContent className="w-fit border-0 p-0">
                <ul className="flex flex-col items-center gap-5 rounded-lg bg-light p-5 dark:bg-dark-2">
                  <DialogClose>
                    <li
                      className="flex w-60 cursor-pointer justify-center rounded-full border border-sc-4 py-2 text-xl text-sc-4 hover:bg-red-80 hover:text-white"
                      onClick={handleDelete}
                    >
                      Delete?
                    </li>
                  </DialogClose>
                  <DialogClose>
                    <li className="w-60 rounded-full border border-sc-4 py-2 text-xl text-sc-4 hover:bg-red-80 hover:text-white">
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
  );
};

export default EditDeleteButton;
