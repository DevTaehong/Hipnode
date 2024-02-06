import { ModalTriggerProps } from "@/types/posts";
import { DialogTrigger } from "@/components/ui/dialog";

const ModalTrigger = ({ isCreateFormPage }: ModalTriggerProps) => {
  const codeOfConductModalStyles = isCreateFormPage
    ? "dark:bg-dark-4 dark:text-light-2 bg-light text-sc-2 base-14 max-w-[9rem]"
    : "text-red-10 bg-red-60 semibold-14 w-full";

  return (
    <DialogTrigger
      className={`${codeOfConductModalStyles} flex-center hover-effect rounded py-2.5`}
    >
      Code Of Conduct
    </DialogTrigger>
  );
};

export default ModalTrigger;
