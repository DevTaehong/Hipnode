import { ChangeEvent, useEffect, useRef } from "react";

import { SuggestionsListProps, LocationProps } from "@/types/posts";
import usePlacesAutocomplete, { Suggestion } from "use-places-autocomplete";

const SuggestionsList = ({
  suggestions,
  onSuggestionSelect,
}: SuggestionsListProps) => (
  <ul className="absolute z-10 mt-1 h-fit max-h-[10rem] overflow-scroll shadow-md">
    {suggestions.map((suggestion) => {
      const {
        place_id: placeId,
        structured_formatting: {
          main_text: mainText,
          secondary_text: secondaryText,
        },
      } = suggestion;

      return (
        <li
          className="relative cursor-pointer p-2 hover:bg-light-2 dark:hover:bg-dark-4"
          key={placeId}
          onClick={onSuggestionSelect(suggestion)}
        >
          <strong>{mainText}</strong> <small>{secondaryText}</small>
        </li>
      );
    })}
  </ul>
);

const Location = ({ setValueHookForm }: LocationProps) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {},
    debounce: 300,
  });

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        clearSuggestions();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSelect = (suggestion: Suggestion) => () => {
    setValue(suggestion.description, false);
    setValueHookForm("location", suggestion.description);
    clearSuggestions();
  };

  return (
    <div className="relative w-full" ref={ref}>
      <label
        className="flex flex-col justify-start pb-2.5 text-[0.875rem] font-semibold leading-none"
        htmlFor="location"
      >
        Location
      </label>
      <input
        className="w-full rounded-lg border-2 border-light-2 bg-light dark:border-dark-4 dark:bg-dark-3 dark:text-light-2 md:px-[1.25rem] md:py-[0.688rem]"
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Location of Meetup?"
      />
      {status === "OK" && (
        <SuggestionsList suggestions={data} onSuggestionSelect={handleSelect} />
      )}
    </div>
  );
};

export default Location;
