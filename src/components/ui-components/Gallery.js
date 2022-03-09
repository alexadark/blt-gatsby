import React, { useState } from "react";
import clsx from "clsx";
import Slider from "react-slick";
import { useMediaQuery } from "../../lib/hooks";
import { Image } from "../images";
import "../../styles/slick/slick.scss";

export const Gallery = ({ images = [], ...props }) => {
  const isLarge = useMediaQuery("(min-width:800px)");

  const desktopSettings = {
    customPaging: function customPaging(i) {
      const img = images[i];

      return (
        <a className="flex mx-1 mb-2 cursor-pointer">
          <Image
            fullObj={img}
            // img={img.thumbLocalFile}
            alt={img.altText}
            loading="eager"
            objectFit="cover"
            objectPosition="center"
          />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-thumbs",
    infinite: true,
    fade: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const mobileSettings = {
    infinite: true,
    fade: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const settings = isLarge ? desktopSettings : mobileSettings;
  return (
    <Slider {...settings} {...props} css={{ ...styles }}>
      {images?.map((image, index) => {
        const { id, altText, caption, description } = image || {};

        return (
          <div key={id + index} className="relative mb-2">
            <Image
              fullObj={image}
              // img={localFile}
              alt={altText}
              loading="eager"
              objectFit="cover"
              objectPosition="center"
              placeholder="blurred"
            />
            {(caption || description) && (
              <>
                <div
                  className={clsx(
                    "absolute left-0 bottom-0  w-full h-[19%] px-3 z-0",
                    "flex flex-col justify-end",
                    "bg-gradient-to-b from-transparent to-gray-900",
                    "text-white",
                    "leading-none"
                  )}
                >
                  <div className="pb-3">
                    {caption && caption !== description && (
                      <div
                        className=" sm:text-f-22 leading-[1.4]"
                        dangerouslySetInnerHTML={{ __html: caption }}
                      />
                    )}
                    {description && (
                      <div
                        className="text-sm font-light text-grey3"
                        dangerouslySetInnerHTML={{ __html: description }}
                      />
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        );
      })}
    </Slider>
  );
};

const styles = {
  ".slick-thumbs": {
    display: "flex !important",
    flexWrap: "wrap",
    margin: "0 -4px",
    cursor: "pointer",
    color: "red",
  },
  ".slick-prev, .slick-next": {
    position: "absolute",
    display: "block",
    top: "40%",

    "@media only screen and (min-width: 800px)": {
      top: 288,
    },

    fontSize: 0,
  },
  ".slick-prev:before, .slick-next:before": {
    display: "block",
    content: "''",

    width: 50,
    height: 50,
    position: `absolute`,
    top: 0,
  },
  ".slick-prev": {
    "&:before": {
      content: '""',
      background: "url(/images/arrow-prev.svg) no-repeat",
      left: 0,
      "@media only screen and (max-width: 640px)": {
        left: -16,
      },
      zIndex: 10,

      // position: 'absolute',
    },
  },
  ".slick-next": {
    right: 0,
    "&:before": {
      content: '""',
      background: "url(/images/arrow-next.svg) no-repeat",
      right: 0,
      "@media only screen and (max-width: 640px)": {
        right: -16,
      },
    },
  },
};
