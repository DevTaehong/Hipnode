"use client";

import { useForm } from "react-hook-form";
import CustomButton from "../CustomButton";

const EmailForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    console.log("Submitting email form data:", data);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: data.email,
          subject: data.subject,
          message: data.message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      const responseData = await response.json();
      console.log("Email sent successfully. Response:", responseData);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">Email:</label>
        <input id="email" {...register("email", { required: true })} />
        {errors.email && <span>This field is required</span>}
      </div>

      <div>
        <label htmlFor="subject">Subject:</label>
        <input id="subject" {...register("subject", { required: true })} />
        {errors.subject && <span>This field is required</span>}
      </div>

      <div>
        <label htmlFor="message">Message:</label>
        <textarea id="message" {...register("message", { required: true })} />
        {errors.message && <span>This field is required</span>}
      </div>
      <CustomButton
        label="Send Email"
        className="w-auto shrink-0 truncate rounded-[0.375rem] bg-red-80 px-[0.875rem] py-[0.55rem] text-[0.75rem] font-medium leading-[1.25rem] text-light dark:text-sc-6 md:px-[1rem] md:py-[0.65rem] md:text-[0.875rem]"
        type="submit"
      />
    </form>
  );
};

export default EmailForm;
