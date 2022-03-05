import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import clsx from "clsx";
import { Button } from "..";

export const AffiliateCard = ({ item, className, ...props }) => {
  const { title, link, description, destination_names } = item;
  const destination = destination_names[0]?.name;

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
          <a
            href={`${link}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:no-underline"
          >
            <StaticImage
              src="../../images/viator-image.svg"
              alt="viator logo"
              objectFit="cover"
              objectPosition="center"
              className="w-full mb-5"
            />
          </a>
        </div>
        {/* Content */}

        <div
          className={clsx("p-4 text-center flex-col justify-between space-y-5")}
        >
          {/* Title and city */}
          <div className="space-y-5 min-h-[110px] ">
            <div>
              <a
                href={`${link}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:no-underline"
              >
                <h3
                  className={clsx(
                    "leading-tight text-f-24 text-grey4 font-medium mt-3"
                  )}
                  dangerouslySetInnerHTML={{ __html: title }}
                />
              </a>
              <div className={clsx("text-f-18 !text-grey4")}>{destination}</div>
            </div>
            {/* Intro */}
            <p
              dangerouslySetInnerHTML={{ __html: description }}
              className="leading-tight prose text-left  line-clamp-3"
            />

            {/* Website or link to profile (read our review) */}
            <div className="space-y-5">
              <div className="flex justify-center">
                <Button
                  secondary
                  as="a"
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {`See Website >`}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
