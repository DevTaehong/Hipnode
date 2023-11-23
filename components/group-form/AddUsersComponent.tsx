import { User } from "@prisma/client";
import { Tag } from "react-tag-autocomplete";

import AddAdminsOrMembers from "./addAdminsOrMembers/AddAdminsOrMembers";

const AddUsersComponent = ({
  selected,
  setSelected,
  users,
  placeholderText,
}: {
  selected: Tag[];
  setSelected: (selected: Tag[]) => void;
  users: User[];
  placeholderText: string;
}) => (
  <div className="flex flex-col gap-2.5">
    <label>Add {placeholderText}</label>
    <AddAdminsOrMembers
      selected={selected}
      setSelected={setSelected}
      users={users}
      placeholderText={placeholderText}
    />
  </div>
);

export default AddUsersComponent;
