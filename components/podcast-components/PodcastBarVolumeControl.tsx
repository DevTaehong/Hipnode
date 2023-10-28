import React from "react";

import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@radix-ui/react-hover-card";
import { Slider } from "../ui/slider";
import {
  ImVolumeLow,
  ImVolumeMedium,
  ImVolumeMute2,
  ImVolumeHigh,
  ImCross,
} from "react-icons/im";
import { Action } from "./podcastReducer";

interface HandleVolumeChangeProps {
  newVolume: number[];
  audioRef: React.RefObject<HTMLAudioElement>;
  dispatch: React.Dispatch<Action>;
}

interface PodcastBarVolumeControlProps {
  handleVolumeChange: (props: HandleVolumeChangeProps) => void;
  handleVolumeIconClick: () => void;
  handleCloseClick: () => void;
  volume: number[];
  audioRef: React.RefObject<HTMLAudioElement>;
  dispatch: React.Dispatch<Action>;
}

const PodcastBarVolumeControl = ({
  handleVolumeChange,
  handleVolumeIconClick,
  handleCloseClick,
  volume,
  audioRef,
  dispatch,
}: PodcastBarVolumeControlProps) => {
  const getVolumeIcon = (volumeValues: number[]) => {
    const volumeValue = volumeValues[0];
    if (volumeValue === 0) {
      return <ImVolumeMute2 />;
    } else if (volumeValue >= 1 && volumeValue <= 33) {
      return <ImVolumeLow />;
    } else if (volumeValue > 33 && volumeValue <= 66) {
      return <ImVolumeMedium />;
    } else {
      return <ImVolumeHigh />;
    }
  };

  const onVolumeChanged = (newVolumeValue: number[]) => {
    handleVolumeChange({
      newVolume: newVolumeValue,
      audioRef,
      dispatch,
    });
  };

  return (
    <div className="flex cursor-pointer gap-3">
      <HoverCard openDelay={100} closeDelay={500}>
        <HoverCardTrigger>
          <div
            className="text-sc-1_light-2 text-2xl"
            onClick={handleVolumeIconClick}
          >
            {getVolumeIcon(volume)}
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="-translate-y-4">
          <Slider
            orientation="vertical"
            defaultValue={volume}
            max={100}
            step={1}
            onValueChange={onVolumeChanged}
          />{" "}
        </HoverCardContent>
      </HoverCard>
      <div
        className="text-sc-1_light-2 flex items-center"
        onClick={handleCloseClick}
      >
        <ImCross />
      </div>
    </div>
  );
};

export default PodcastBarVolumeControl;
