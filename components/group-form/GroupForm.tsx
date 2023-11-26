"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { User } from "@prisma/client";
import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

import FormFieldComponent from "./FormFieldComponent";
import SetCoverComponent from "./SetCoverComponent";
import SetProfilePhotoComponent from "./SetProfilePhotoComponent";
import { Form } from "@/components/ui/form";
import { useToast } from "../ui/use-toast";
import { createGroup } from "@/lib/actions/group.actions";
import { Tag } from "@/types";
import AddUsersComponent from "./AddUsersComponent";
import { formSchema } from ".";
import { PLACEHOLDER_IMAGE_URL } from "@/constants";
import { Button } from "../ui/button";

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

  const [members, admins] = useMemo(() => {
    // NOTE - 1. Get the users from the selected tags
    const members = membersSelected.map((tag) => tag.user);
    const admins = adminSelected.map((tag) => tag.user);

    // NOTE - Current user will be admin and member at the same time
    admins.push(currentUser);
    members.push(...admins);

    return [members, admins];
  }, [adminSelected, membersSelected, currentUser]);

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
        coverImage: coverUrl ?? PLACEHOLDER_IMAGE_URL,
        logo: profilePhotoURL ?? PLACEHOLDER_IMAGE_URL,
      });
      toast({
        title: "Group created successfully",
        duration: 9000,
      });
      router.push("/group");
    } catch (error) {
      setIsSubmitting(false);
      toast({
        title: "" + error,
        duration: 9000,
        variant: "destructive",
      });
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
          <Button
            type="submit"
            className="sm:semibold-16 h-[2.625rem] w-[7.5rem] rounded-lg bg-blue px-10 py-2.5 text-blue-10 hover:opacity-80 hover:transition-opacity sm:h-11 sm:w-[7.8125rem]"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              "Create"
            )}
          </Button>
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
