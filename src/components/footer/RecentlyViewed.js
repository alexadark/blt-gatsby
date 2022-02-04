import React from "react"
import clsx from "clsx"
import Slider from "react-slick"
import ls from "local-storage"
import { Link } from "gatsby"
import { Section, Underline } from ".."
import { useMediaQuery } from "../../lib/hooks"
import { Image } from "../images"
import noImage from '../../images/noimage.svg'

export const RecentlyViewed = ({ className, ...props }) => {
  const rvData = ls("recentlyViewed")?.reverse() || []
  const isLarge = useMediaQuery("(min-width:1024px)")
  const isMedium = useMediaQuery("(min-width:600px)")
  const isSmall = useMediaQuery("(min-width:480px)")

  const ArrayLength = isLarge ? 6 : isMedium ? 3 : isSmall ? 2 : 1
  const dummyArray = new Array(
    ArrayLength > rvData.length ? ArrayLength - rvData.length : 0
  ).fill({
    image: "/images/noimage.svg",
  })

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }
  return (
    <Section
      className={clsx(
        "pt-8 px-4 pb-16 mb-base2",
        "container max-w-big",
        "my-base2",
        className
      )}
      {...props}
    >
      <h2 className="text-center text-f-40 md:text-[48px] text-grey5 font-light mb-6">
        Recently viewed
      </h2>
      <Underline />
      <Slider {...settings} css={{ ...styles }}>
        {rvData?.map((item, i) => {
          const { featuredImage, title, uri } = item
          const { altText, localFile } = featuredImage?.node || {}
          return (
            <div key={i} className="px-base py-base2 group">
              <Link
                to={uri || "#"}
                className="hover:no-underline"
                css={{
                  "&:hover": { h3: { textDecoration: "none !important" } },
                }}
              >
                <div className="cursor-pointer shadow-listing">
                  <div className="aspect-w-6 aspect-h-4 max-h-[127px] group">
                    {localFile ? (
                      <Image
                        img={localFile}
                        alt={altText}
                        loading="eager"
                        // className="w-full h-[233px] sm:h-[127px]"
                      />
                    ) : (
                      // <div className="aspect-6 aspect-h-4">
                      //   <img src="/images/noimage.svg" alt="no-image" />
                      // </div>
                      // <div className="relative aspect-w-6 aspect-h-4 bg-veryLightGold" />
                      <img src={noImage} alt="image placeholder" width="233px" height="127px" />
                    )}
                  </div>
                  <div className="py-4 text-center px-base group h-[100px]">
                    {title && (
                      <h3
                        className="text-[20px] font-medium text-grey5 line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: title }}
                      />
                    )}
                  </div>
                </div>
              </Link>
            </div>
          )
        })}
        {rvData.length <= ArrayLength &&
          dummyArray.map((item, i) => {
            const { image, title } = item
            return (
              <div key={i} className="px-base py-base2 ">
                <div className="cursor-pointer shadow-listing ">
                  {/* <div className="relative aspect-w-6 aspect-h-4 bg-veryLightGold max-h-[127px]" /> */}
                  <img src={noImage} alt="image placeholder" width="233px" height="127px" />


                  {/* <img
                      src={image}
                      alt={"no image"}
                      className="object-cover object-center h-[127px]"
                    /> */}

                  <div className="py-4 text-center px-base group h-[100px]">
                    <h3
                      className="text-[20px] font-medium text-grey5 "
                      dangerouslySetInnerHTML={{ __html: title }}
                    />
                  </div>
                </div>
              </div>
            )
          })}
      </Slider>
    </Section>
  )
}

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
    top: 65,

    // '@media only screen and (min-width: 800px)': {
    //   top: 288,
    // },

    fontSize: 0,
  },
  ".slick-prev:before, .slick-next:before": {
    display: "block",
    content: "''",

    width: 50,
    height: 50,
    position: `absolute`,
    top: 0,
    "@media only screen and (max-width: 480px)": {
      top: 60,
    },
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
}
