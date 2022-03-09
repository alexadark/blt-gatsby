import React from "react";
import { Image } from "../images";
import { Link } from "gatsby";
import clsx from "clsx";
import { useBucketList } from "../../lib/hooks/useBucketList";
import { Button } from "..";
import { AddToBlButton } from "../bucket-list/AddToBlButton";
import { ListingBottomInfo } from "./ListingBottomInfo";
import noImage from "../../images/noimage.svg";

export const ListingCard = ({
  item,
  pts,
  itinerary,
  writer,
  noBl,
  roundUp,
  nested,
  className,
  ...props
}) => {
  let { title, intro, externalLink, link } = item;
  let { featuredImage, uri, commonDataAttributes, customDataAttributes } = link
    ? link[0] || {}
    : item || {};

  let { country, standfirst } = commonDataAttributes || {};

  let {
    city,
    region,
    website,
    profile,
    starRating,
    minAge,
    priceFrom,
    duration,
    whenIsIt,
    summaryBio,
  } = customDataAttributes || {};

  website = externalLink ? externalLink : website;
  profile = profile ? profile : "full";
  uri =
    profile === "full" || pts || itinerary || writer || roundUp || nested
      ? uri
      : website
      ? website
      : "#";

  const blItem = item.link ? item.link[0] : item;
  const { addToBl, removeFromBl, isAdded } = useBucketList(blItem);

  const img = featuredImage ? (
    <Image
      // img={featuredImage.node.localFile}
      fullObj={featuredImage.node}
      alt={title}
      objectFit="cover"
      objectPosition="center"
      className="w-full"
    />
  ) : (
    // <div className="flex items-center justify-center w-full h-full bg-veryLightGold">
    //   no image
    // </div>
    <img src={noImage} alt="placeholder image" width="249px" height="166px" />
  );

  const isFull = profile === "full" || itinerary || pts || writer;

  return (
    <div className={clsx("relative", className)} {...props}>
      <div
        className={clsx(
          "h-full w-[300px] lg:w-[300px] xl:w-[275px]  shadow-listing relative"
          // 'flex flex-col justify-between'
        )}
        {...props}
      >
        <div className="h-[187px] w-full flex relative">
          {/* Image */}
          {img}
          {!noBl ? (
            isAdded ? (
              <AddToBlButton
                remove
                addToBl={removeFromBl}
                className="absolute z-10 px-2 py-1 text-2xl text-white cursor-pointer top-2 right-2"
              />
            ) : (
              <AddToBlButton
                add
                addToBl={addToBl}
                className="absolute z-10 px-2 py-1 text-2xl text-white cursor-pointer top-2 right-2"
              />
            )
          ) : (
            <div></div>
          )}
        </div>
        {/* Content */}

        <div
          className={clsx("p-4 text-center flex-col justify-between space-y-5")}
        >
          {/* Title and city */}
          <div className="space-y-5 min-h-[110px] ">
            <div>
              <Link
                to={`${uri}`}
                className="hover:no-underline"
                target={isFull ? "_self" : "_blank"}
                rel={isFull ? "preload" : "noopener noreferrer"}
              >
                <h3
                  className={clsx(
                    "leading-tight text-f-24 text-grey4 font-medium"
                  )}
                  dangerouslySetInnerHTML={{ __html: title }}
                />
              </Link>
              <div className={clsx("text-f-18 !text-grey4")}>
                {city ? city : region ? region : country?.name}
              </div>
            </div>
            {/* Intro */}
            <div
              dangerouslySetInnerHTML={{
                __html: intro ? intro : summaryBio ? summaryBio : standfirst,
              }}
              className="leading-tight prose text-left md:hidden "
            />
          </div>
          {/* Website or link to profile (read our review) */}
          <div className="space-y-5">
            {pts && (
              <ListingBottomInfo
                starRating={starRating}
                minAge={minAge}
                priceFrom={priceFrom}
                whenIsIt={whenIsIt}
                duration={duration}
                card
                className="justify-center"
              />
            )}
            <div className="flex justify-center">
              {profile === "full" || itinerary || pts || writer || nested ? (
                <Link to={uri}>
                  <Button className="h-10 whitespace-nowrap">
                    {writer ? "Read more" : "Read review >"}
                  </Button>
                </Link>
              ) : (
                website && (
                  <Button
                    secondary
                    as="a"
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {`See Website >`}
                  </Button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
