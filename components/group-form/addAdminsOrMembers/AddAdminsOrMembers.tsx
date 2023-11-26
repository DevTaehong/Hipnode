import { ReactTags, Tag } from "react-tag-autocomplete";
import { User } from "@prisma/client";

import { CustomTagSuggestion } from "@/types";
import CustomTag from "./CustomTag";
import CustomOption from "./CustomOption";

// NOTE - https://www.npmjs.com/package/react-tag-autocomplete
const AddAdminsOrMembers = ({
  users,
  placeholderText,
  selected,
  setSelected,
}: {
  users: User[];
  placeholderText: string;
  selected: Tag[];
  setSelected: (selected: Tag[]) => void;
}) => {
  const usersSuggestion: CustomTagSuggestion[] = users.map((user) => {
    return {
      value: user.id,
      label: user.name,
      user,
    };
  });

  const onAdd = (newTag: Tag) => {
    setSelected([...selected, newTag]);
  };

  const onDelete = (tagIndex: number) => {
    setSelected(selected.filter((_, i) => i !== tagIndex));
  };

  return (
    <ReactTags
      classNames={{
        root: "react-tags",
        rootIsActive: "is-active",
        rootIsDisabled: "is-disabled",
        rootIsInvalid: "is-invalid",
        label: "react-tags__label",
        tagList: "react-tags__list",
        tagListItem: "react-tags__list-item",
        tag: "react-tags__tag",
        tagName: "react-tags__tag-name",
        comboBox: "react-tags__combobox",
        input: "react-tags__combobox-input",
        listBox: "react-tags__listbox",
        option: "react-tags__listbox-option",
        optionIsActive: "is-active",
        highlight: "react-tags__listbox-option-highlight",
      }}
      labelText=""
      selected={selected}
      suggestions={usersSuggestion}
      onAdd={onAdd}
      onDelete={onDelete}
      noOptionsText="No matching users"
      placeholderText={`Add ${placeholderText}...`}
      renderTag={CustomTag}
      renderOption={CustomOption}
    />
  );
};

export default AddAdminsOrMembers;
