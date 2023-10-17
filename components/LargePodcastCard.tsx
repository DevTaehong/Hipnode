import React from "react";

type LargePodcastCardType = {
  title: string;
  details: string;
};

const LargePodcastCard = ({ title, details }: LargePodcastCardType) => {
  return (
    <section className="bg-light_dark-3 flex w-full flex-col gap-5 rounded-2xl p-2.5 md:p-5">
      <p className="text-sc-2_light-2 semibold-26">{title}</p>
      <p className="regular-16 text-sc-3">{details}</p>
    </section>
  );
};

export default LargePodcastCard;
