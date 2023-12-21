/* eslint-disable camelcase */

import React, { ChangeEvent } from "react";

import usePlacesAutocomplete, { Suggestion } from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";

type LocationProps = {
  setValueHookForm: (name: "location", value: string) => void;
};

const Location = ({ setValueHookForm }: LocationProps) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    callbackName: "YOUR_CALLBACK_NAME",
    requestOptions: {},
    debounce: 300,
  });

  const ref = useOnclickOutside(() => {
    clearSuggestions();
  });

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSelect = (suggestion: Suggestion) => () => {
    setValue(suggestion.description, false);
    setValueHookForm("location", suggestion.description);
    clearSuggestions();
  };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <div className="cursor-pointer" key={place_id}>
          <li onClick={handleSelect(suggestion)}>
            <strong>{main_text}</strong> <small>{secondary_text}</small>
          </li>
        </div>
      );
    });

  return (
    <div className="w-full" ref={ref}>
      <label
        className="flex flex-col justify-start pb-2.5 text-[0.875rem] font-medium leading-none"
        htmlFor="location"
      >
        Location
      </label>
      <input
        className="w-full bg-light-2 dark:bg-dark-4 dark:text-light-2 md:px-[1.25rem] md:py-[0.688rem]"
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Location of Meetup?"
      />
      {status === "OK" && <ul>{renderSuggestions()}</ul>}
    </div>
  );
};

export default Location;
