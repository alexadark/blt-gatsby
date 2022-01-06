import React from "react";
import { Image } from "../images";
import clsx from "clsx";
import { FaCheck } from "react-icons/fa";
import { useMediaQuery } from "../../lib/hooks";
import { Home404Search } from "../search";

const Sentences = ({ topSentences }) => {
  const isSmall = useMediaQuery("(max-width:640px)");
  return (
    <>
      <p className="text-gold font-bold text-[20px] sm:text-f-22  mb-4 sm:mb-0 ">
        For those who want to:
      </p>
      {topSentences?.map((item, i) => (
        <div key={i} className="flex items-center mb-4 sm:my-4">
          <FaCheck className="mr-3 text-gold text-f-26" />
          <div className="text-white text-[17px] sm:text-f-26 sm:font-bold ">
            {item.sentence}
          </div>
        </div>
      ))}
    </>
  );
};

export const HomeHero = ({ homeHero }) => {
  const { heroTitle, heroImage, topSentences } = homeHero;
  return (
    <>
      <div className={clsx("relative")}>
        <div className="z-0">
          {heroImage && (
            <>
              <Image
                img={heroImage?.localFile}
                alt={heroImage?.altText}
                priority={true}
                objectFit="cover"
                objectPosition="center"
                className="h-[277px] sm:h-[578px]"
              />
              <div
                className={clsx(
                  "absolute left-0 bottom-0  w-full h-[50%] z-0",
                  "flex flex-col justify-end",
                  "bg-gradient-to-b from-transparent to-darkBlue",
                  "text-white",
                  "leading-none"
                )}
              />
            </>
          )}
        </div>

        <div className="absolute top-0 left-0 z-10 w-full h-full"></div>

        <div
          className={clsx(
            "absolute top-0 left-0 z-20 w-full h-full",
            "px-5 pt-5 pb-5 sm:pb-12",
            "flex flex-col justify-end sm:justify-between"
          )}
        >
          {/* Top sentences */}
          <div className={clsx("container max-w-big")}>
            <div className="hidden p-6 bg-opacity-50 sm:inline-block bg-darkBlue">
              <Sentences topSentences={topSentences} />
            </div>
          </div>
          {/* Search */}
          <div className="text-center">
            <h2 className="mb-4 text-lg font-bold leading-tight text-white sm:mb-8 sm:text-f-26 md:text-f-36">
              {heroTitle}
            </h2>
            <Home404Search />
          </div>
        </div>
      </div>
      {/* Sentences mobile */}
      <div className="container p-3 px-5 pr-7 sm:hidden bg-darkBlue">
        <Sentences topSentences={topSentences} />
      </div>
    </>
  );
};
