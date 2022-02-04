import React, { useState } from "react";
import clsx from "clsx";
import { Image } from "../images";
import { Link } from "gatsby";
import Collapse from "@kunukn/react-collapse";
import { FaChevronDown } from "react-icons/fa";
import { useBucketList } from "../../lib/hooks/useBucketList";
import { Button } from "..";
import { Price } from "../Price";
import { ListingBottomInfo } from "./ListingBottomInfo";
import { AddToBlButton } from "../bucket-list/AddToBlButton";
import noImage from "../../images/noimage.svg";

export const Listing = ({
  item,
  search = false,
  noBl = false,
  className = null,
  itinerary = false,
  writer = false,
  pts = false,
  roundUp = false,
  nested = false,
  distance = null,
  ...props
}) => {
  const [open, setOpen] = useState(false);


  let { title, intro, externalLink, link, databaseId } = item || {};

  const distanceObject = JSON.parse(distance);
  const distanceToParent = Math.round(distanceObject?.[databaseId] * 10) / 10;

  let { featuredImage, uri, commonDataAttributes, customDataAttributes } = link
    ? link[0] || {}
    : item || {};

  let { standfirst, country } = commonDataAttributes || {};
  const blItem = item.link ? item.link[0] : item;

  const { addToBl, removeFromBl, isAdded } = useBucketList(blItem);

  let {
    starRating,
    priceCheckingLinks,
    website,
    minAge,
    ageBestSuitedFrom,
    priceFrom,
    duration,
    profile,
    whenIsIt,
    city,
    region,
    summaryBio,
  } = customDataAttributes || {};

  profile = profile ? profile : "full";
  const profileLink = profile === "full" || pts || itinerary || writer || roundUp || nested

  website = externalLink ? externalLink : website;
  uri =
    profileLink
      ? uri
      : website
      ? website
      : "#";

const WithLink = ({ children, link, uri, ...props }) => {
  if (link) {
    return (
      <Link to={uri} {...props}>
       {children}
      </Link>
    );
  }
  return <div {...props}>{children}</div>
}


  const img = featuredImage ? (
    featuredImage.node.localFile ? (
      <Image
        img={featuredImage.node.localFile}
        alt={title}
        width={249}
        height={166}
        objectFit="cover"
        objectPosition="center"
        loading="eager"
      />
    ) : (
      <img
        src={featuredImage.node.sourceUrl}
        width={249}
        height={166}
        alt=""
        className="object-cover object-center"
      />
    )
  ) : (
    // <div className="flex items-center justify-center col-span-1 bg-veryLightGold w-[249px] h-[166px] text-grey4 ">
    //   No Image
    // </div>
    <img src={noImage} alt="placeholder image" width="249px" height="166px" />
  );
  return (
    <div className={clsx("shadow-listing", "p-2 pr-3 mb-5", className)}>
      <div className={clsx("flex justify-between")} {...props}>
        <div className="flex">
          {/* Left: Image */}
          <WithLink link={profileLink} to={`${uri}`} className="hover:no-underline">
            <div className="flex mr-5 w-[249px] ">{img}</div>
          </WithLink>

          {/* Middle: title content stars features */}
          <div
            className={`${
              search ? "max-w-[470px]" : "max-w-[470px]"
            } flex flex-col justify-between`}
          >
            <div>
              <WithLink to={`${uri}`} link={profileLink} className="hover:no-underline ">
                <h2
                  className="font-bold leading-none text-grey4 text-f-24"
                  dangerouslySetInnerHTML={{ __html: title }}
                />
              </WithLink>

              {city ||
                region ||
                (country && (
                  <div className="flex space-x-2">
                    <h3 className="mb-2 text-f-18 text-grey5">
                      {city ? city : region ? region : country?.name}
                    </h3>
                  </div>
                ))}
              {distance && distanceObject?.[databaseId] && (
                <span className="distance inline-block ml-2 font-bold">
                  [{distanceToParent} miles]
                </span>
              )}
              <div
                dangerouslySetInnerHTML={{
                  __html: intro ? intro : summaryBio ? summaryBio : standfirst,
                }}
                className="mt-4 mb-3 mr-2 leading-tight prose"
              />
            </div>
  {!roundUp &&
            <ListingBottomInfo
              starRating={starRating}
              age={ageBestSuitedFrom}
              priceFrom={priceFrom}
              whenIsIt={whenIsIt}
              duration={duration}
            />
      }
          </div>
        </div>

        {/* Right: Buttons */}
        <div className="flex flex-col items-end justify-between">
          {!noBl ? (
            isAdded ? (
              <AddToBlButton remove={true} addToBl={removeFromBl} />
            ) : (
              <AddToBlButton add={true} addToBl={addToBl} />
            )
          ) : (
            <div></div>
          )}
          {/* Website or link to profile (read our review) */}
          {profile === "full" ||
          itinerary ||
          pts ||
          writer ||
          nested ||
          roundUp ? (
            <Link to={uri} className="!text-sm btn h-10">
              {writer ? "Read more" : "Review"}
            </Link>
          ) : (
            website && (
              <Button
                secondary
                as="a"
                className="!text-sm"
                href={website}
                target="_blank"
                rel="noopener noreferrer"
              >
                Website
              </Button>
            )
          )}
          {/* Price checking links button */}
          {priceCheckingLinks || (website && pts) ? (
            <Button
              secondary
              className="!text-sm"
              onClick={(e) => {
                e.preventDefault();
                setOpen(!open);
              }}
              css={{
                "&:hover": {
                  svg: { color: "white" },
                },
              }}
            >
              Prices{" "}
              <FaChevronDown
                className={clsx(
                  "transition duration-500",
                  "ml-3 -mt-1",
                  "text-lightBlue text-sm",
                  { "transform rotate-180": open }
                )}
              />
            </Button>
          ) : (
            <div></div>
          )}
        </div>
      </div>

      <Collapse
        isOpen={open}
        className="duration-500 ease-in-out transition-height"
      >
        <Price
          priceCheckingLinks={priceCheckingLinks}
          website={website}
          className="mt-10"
        />
      </Collapse>
    </div>
  );
};
