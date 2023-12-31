import { useForm } from "react-hook-form";
import CustomButton from "../CustomButton";
import { sendEmail } from "@/lib/actions/email.actions";

const EmailForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    const res = await sendEmail(data);
    console.log(res);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-light dark:bg-dark-3 ">
        <div>
          <label
            className="pl-2 font-[1.625rem] leading-[2.375rem] text-sc-2 dark:text-light-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className={`w-full bg-light-2 dark:bg-dark-4 dark:text-light-2 md:px-[1.25rem] md:py-[0.688rem]`}
            id="email"
            {...register("email", { required: true })}
          />
          {errors.email && <span>This field is required</span>}
        </div>

        <div>
          <label
            className="pl-2 font-[1.625rem] leading-[2.375rem] text-sc-2 dark:text-light-2"
            htmlFor="subject"
          >
            Subject
          </label>
          <input
            className={`w-full bg-light-2 dark:bg-dark-4 dark:text-light-2 md:px-[1.25rem] md:py-[0.688rem]`}
            id="subject"
            {...register("subject", { required: true })}
          />
          {errors.subject && <span>This field is required</span>}
        </div>

        <div>
          <label
            className="pl-2 font-[1.625rem] leading-[2.375rem] text-sc-2 dark:text-light-2"
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            className={`w-full bg-light-2 dark:bg-dark-4 dark:text-light-2 md:px-[1.25rem] md:py-[0.688rem]`}
            id="message"
            {...register("message", { required: true })}
          />
          {errors.message && <span>This field is required</span>}
        </div>
        <CustomButton
          label="Send Email"
          className="w-auto shrink-0 truncate rounded-[0.375rem] bg-red-80 px-[0.875rem] py-[0.55rem] text-[0.75rem] font-medium leading-[1.25rem] text-light dark:text-sc-6 md:px-[1rem] md:py-[0.65rem] md:text-[0.875rem]"
          type="submit"
        />
      </div>
    </form>
  );
};

export default EmailForm;
