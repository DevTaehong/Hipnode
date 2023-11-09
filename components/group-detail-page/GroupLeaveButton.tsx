import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import FillIcon from "@/components/icons/fill-icons";
import LeaveIcon from "@/components/icons/fill-icons/LeaveIcon";

const GroupLeaveButton = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="semibold-12 flex items-center gap-2 rounded bg-light-2 p-2 text-sc-3 dark:bg-dark-4">
          <FillIcon className="fill-sc-3">
            <LeaveIcon />
          </FillIcon>
          Leave
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent
        className="inline-flex h-[10.125rem] w-[20.875rem] flex-col items-start gap-[1.88rem] rounded-2xl border-none bg-light 
        px-[0.9375rem] py-[1.88rem] shadow-none dark:bg-dark-4 sm:w-[22.75rem] sm:px-[1.88rem]"
      >
        <AlertDialogHeader>
          <AlertDialogTitle className="semibold-18 text-center text-sc-2 dark:text-light-2">
            Are You Sure to Leave From This Group?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-row items-center gap-5">
          <AlertDialogAction className="flex h-[2.875rem] w-40 items-center justify-center rounded-md bg-blue p-[0.62rem]">
            <span className="semibold-18 text-light">Leave Group</span>
          </AlertDialogAction>
          <AlertDialogCancel className="m-0 border-none p-0 py-[0.62rem] dark:bg-dark-4">
            <span className="regular-18 text-sc-3">Cancel</span>
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default GroupLeaveButton;
