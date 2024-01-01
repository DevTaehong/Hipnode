"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { DialogClose } from "@radix-ui/react-dialog";

import CustomButton from "../CustomButton";
import { sendEmail } from "@/lib/actions/email.actions";
import HipnodeHeaderLogo from "../icons/HipnodeHeaderLogo";

type EmailFormProps = {
  toast: any;
  currentUrl: string;
  setOpen: (open: boolean) => void;
};

const EmailForm = ({ toast, currentUrl, setOpen }: EmailFormProps) => {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    startTransition(async () => {
      const res = await sendEmail({ ...data, currentUrl });
      if (res) {
        toast({
          title: "Email sent Successfully",
          variant: "formFieldsFill",
        });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full min-w-[19rem] bg-light dark:bg-dark-3">
        <div className="w-full">
          <div className="flex flex-col items-center justify-center">
            <p className="flex items-center justify-center py-3 text-sc-2 dark:text-light-2">
              Reporting Post
            </p>
            <p className="h-[1.2rem] justify-start p-3 pb-6 text-red-80 hover:text-[1.1rem]">
              We will automatically get a link to the reported post
            </p>
          </div>

          <label
            className="pl-2 font-[1.625rem] leading-[2.375rem] text-sc-2 dark:text-light-2"
            htmlFor="email"
          >
            Your Contact Email
          </label>
          <input
            className={`w-full bg-light-2  outline-none dark:bg-dark-4 dark:text-light-2 md:px-[1.25rem] md:py-[0.688rem]`}
            id="email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="pt-2 text-red-80">This field is required</span>
          )}
        </div>

        <div>
          <label
            className="pl-2 font-[1.625rem] leading-[2.375rem] text-sc-2 dark:text-light-2"
            htmlFor="subject"
          >
            Subject
          </label>
          <input
            className={`w-full bg-light-2 outline-none dark:bg-dark-4 dark:text-light-2 md:px-[1.25rem] md:py-[0.688rem]`}
            id="subject"
            {...register("subject", { required: true })}
          />
          {errors.subject && (
            <span className="pt-2 text-red-80">This field is required</span>
          )}
        </div>

        <div>
          <label
            className="pl-2 font-[1.625rem] leading-[2.375rem] text-sc-2 dark:text-light-2"
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            className={`w-full bg-light-2 outline-none dark:bg-dark-4 dark:text-light-2 md:px-[1.25rem] md:py-[0.688rem]`}
            id="message"
            {...register("message", { required: true })}
          />
          {errors.message && (
            <span className="pt-2 text-red-80">This field is required</span>
          )}
        </div>
        <DialogClose>
          <CustomButton
            label={`${isPending ? "Sending..." : "Send"}`}
            className={`${
              isPending ? "animate-pulse" : ""
            } w-auto shrink-0 truncate rounded-[0.375rem] bg-red-80 px-[0.875rem] py-[0.55rem] text-[0.75rem] font-medium leading-[1.25rem] text-light dark:text-sc-6 md:px-[1rem] md:py-[0.65rem] md:text-[0.875rem]`}
            type="submit"
            onClick={() => {
              setTimeout(() => {
                setOpen(false);
              }, 1000);
            }}
          />
        </DialogClose>
      </div>
      <p className="py-6 text-center dark:text-light-2">
        Hipnode ・Bulgaria, Poland, Canada & USA ・JS Mastery Graduates 2024
      </p>
      <div className="flex justify-center">
        <HipnodeHeaderLogo />
      </div>
    </form>
  );
};

export default EmailForm;
