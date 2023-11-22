"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { Form } from "@/components/ui/form";
import CustomButton from "../CustomButton";
import FormFieldComponent from "./FormFieldComponent";
import SetCoverComponent from "./SetCoverComponent";
import SetProfilePhotoComponent from "./SetProfilePhotoComponent";

// NOTE - This is a sample form schema. Will work on the logic after the layout is merged.
const formSchema = z.object({
  groupName: z.string().min(2, {
    message: "group name must be at least 2 characters.",
  }),
});

const GroupForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      groupName: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-[55rem] space-y-8 rounded-2xl bg-light p-5 dark:bg-dark-3"
      >
        <div className="flex flex-col gap-10">
          <SetCoverComponent />
          <SetProfilePhotoComponent />
          <div className="semibold-12 sm:semibold-14 flex flex-col gap-5 text-sc-2 dark:text-light-2">
            <FormFieldComponent
              control={form.control}
              name="groupName"
              label="Group Name"
              placeholder="Name"
            />
            <FormFieldComponent
              control={form.control}
              name="description"
              label="Description"
              placeholder="Provide a short Description..."
              fieldType="textarea"
            />
            <FormFieldComponent
              control={form.control}
              name="admins"
              label="Add admins"
              placeholder="Add admins..."
            />
            <FormFieldComponent
              control={form.control}
              name="members"
              label="Add members"
              placeholder="Add members..."
            />
          </div>
        </div>
        <div className="semibold-14 flex items-center gap-5">
          <CustomButton
            type="submit"
            className="sm:semibold-16 h-[2.625rem] rounded-lg bg-blue px-10 py-2.5 text-blue-10 sm:h-11"
            label="Create"
          />
          <Link href="/group" className="sm:regular-16 text-sc-3">
            Cancel
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default GroupForm;
