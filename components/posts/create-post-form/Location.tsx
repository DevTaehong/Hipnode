import { Controller, Control } from "react-hook-form";
import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from "@geoapify/react-geocoder-autocomplete";
import { FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { PostFormValuesType } from "@/constants/posts";

export interface GeocodeResult {
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  properties: {
    name: string;
  };
}

export interface LocationProps {
  control: Control<PostFormValuesType>;
}

const Location = ({ control }: LocationProps) => {
  const onPlaceSelect = (value: any) => {
    return value.properties.name;
  };

  const onSuggestionChange = (value: any) => {
    return value.properties.name;
  };

  return (
    <div className="w-full">
      <FormItem className="relative flex w-full flex-col">
        <FormLabel>Location</FormLabel>
        <FormControl className="w-full ">
          <div className="absolute top-[1.5rem]  z-10 w-full bg-light-2 dark:bg-dark-4">
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <GeoapifyContext
                  apiKey={process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY}
                >
                  <GeoapifyGeocoderAutocomplete
                    {...field}
                    placeSelect={onPlaceSelect}
                    suggestionsChange={onSuggestionChange}
                    placeholder="Enter location here"
                    lang="en"
                    limit={5}
                  />
                </GeoapifyContext>
              )}
            />
          </div>
        </FormControl>
      </FormItem>
    </div>
  );
};

export default Location;
