import React from "react";
import { NewsletterHome } from "../Newsletter";
import { Awards } from "./Awards";
import { HomeHero } from "./HomeHero";
import { WhatWeOffer } from "./WhatWeOffer";
import LatestRoundups from "./LatestRoundups";
export const FrontPage = ({ homeHero, whatWeOffer, url, awards }) => {
  return (
    <>
      <HomeHero homeHero={homeHero} />
      <WhatWeOffer whatWeOffer={whatWeOffer} url={url} />
      {awards.items && <Awards awards={awards.items} />}
      <LatestRoundups />
      <NewsletterHome className="my-base2" />
    </>
  );
};
