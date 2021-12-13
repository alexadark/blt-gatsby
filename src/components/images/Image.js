// @ts-nocheck
import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";

export const Image = ({
  img,
  loading = "lazy",

  ...props
}) => {
  return (
    !!img && (
      <GatsbyImage
        loading={loading}
        image={img?.childImageSharp?.gatsbyImageData}
        alt={img?.altText ?? ""}
        {...props}
      />
    )
  );
};
