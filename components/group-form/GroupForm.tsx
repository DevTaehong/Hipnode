"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { User } from "@prisma/client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import FormFieldComponent from "./FormFieldComponent";
import SetCoverComponent from "./SetCoverComponent";
import SetProfilePhotoComponent from "./SetProfilePhotoComponent";
import { Form } from "@/components/ui/form";
import { useToast } from "../ui/use-toast";
import { createGroup } from "@/lib/actions/group.actions";
import { Tag } from "@/types";
import AddUsersComponent from "./AddUsersComponent";
import { formSchema } from ".";

const GroupForm = ({
  users,
  currentUser,
}: {
  users: User[];
  currentUser: User;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      groupName: "",
      description: "",
    },
  });
  const router = useRouter();
  const { toast } = useToast();
  const search = useSearchParams();
  const profilePhotoURL = search.get("profilePhotoUrl");
  const coverUrl = search.get("coverUrl");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // NOTE - These states are for the AddAdminsOrMembers component
  const [adminSelected, setAdminSelected] = useState<Tag[]>([]);
  const [membersSelected, setMembersSelected] = useState<Tag[]>([]);

  // NOTE - 1. Get the users from the selected tags
  const admins = adminSelected.map((tag) => tag.user);
  const members = membersSelected.map((tag) => tag.user);

  // NOTE - 2. Admins are also members of the group
  members.push(...admins);

  // NOTE - 3. Current user will be admin and member at the same time
  admins.push(currentUser);
  members.push(currentUser);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    try {
      await createGroup({
        name: values.groupName,
        description: values.description,
        path: "/group",
        members:
          members?.filter((member): member is User => Boolean(member)) ?? [],
        createdBy: currentUser.id,
        admins: admins?.filter((admin): admin is User => Boolean(admin)) ?? [],
        coverImage: coverUrl ?? "/images/hipnode.svg",
        logo: profilePhotoURL ?? "/images/hipnode.svg",
      });
      toast({
        title: "Group created successfully",
        duration: 10000,
      });
      router.push("/group");
    } catch (error) {
      toast({
        title: "Error creating group: " + error,
        duration: 10000,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
            <AddUsersComponent
              selected={adminSelected}
              setSelected={setAdminSelected}
              users={users}
              placeholderText="admins"
            />
            <AddUsersComponent
              selected={membersSelected}
              setSelected={setMembersSelected}
              users={users}
              placeholderText="members"
            />
          </div>
        </div>
        <div className="semibold-14 flex items-center gap-5">
          <button
            type="submit"
            className="sm:semibold-16 h-[2.625rem] rounded-lg bg-blue px-10 py-2.5 text-blue-10 hover:opacity-80 hover:transition-opacity sm:h-11"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create"}
          </button>
          <Link
            href="/group"
            className="sm:regular-16 text-sc-3 hover:opacity-80 hover:transition-opacity"
          >
            Cancel
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default GroupForm;
