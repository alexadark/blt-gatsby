// @ts-nocheck
import React from "react";
// import { GatsbyImage } from "gatsby-plugin-image";

export const Image = ({
  img,
  loading = "lazy",

  ...props
}) => {
  const { fullObj, className } = props || {};

  if (fullObj?.sourceUrl) {
    // console.log({ img, props });
    return (
      <img
        className={`w-full h-full overflow-hidden ${className}`}
        src={fullObj.sourceUrl}
        alt=""
      />
    );
  }
  return null;
  // return (
  //   !!img && (
  //     <GatsbyImage
  //       loading={loading}
  //       image={img?.childImageSharp?.gatsbyImageData}
  //       alt={img?.altText ?? ""}
  //       {...props}
  //     />
  //   )
  // );
};
