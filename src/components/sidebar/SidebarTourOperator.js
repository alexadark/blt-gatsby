import React from "react";
import clsx from "clsx";
import { Section, Typo, Button, Image, Underline } from "..";
import noImage from "../../images/noimage.svg";

const SidebarTourOperator = ({
  tourOperator,
  description,
  className,
  ...props
}) => {
  const {
    title,
    featuredImage,
    commonDataAttributes,
    tourOperatorDataAttributes,
  } = tourOperator || {};

  const { phone, website } = tourOperatorDataAttributes || {};

  return (
    <Section className={clsx("p-5", className)} {...props}>
      <Typo as="h3" className={clsx("text-center ")}>
        Ask the experts
      </Typo>
      <Underline />
      <div className="space-y-5">
        <Typo as="h4" h4 className="text-center">
          {title}
        </Typo>
        <div className="flex justify-center">
          {featuredImage ? (
            <Image
              img={featuredImage?.node.localFile}
              fullObj={featuredImage.node}
              objectFit="cover"
              objectPosition="center"
              className="w-full max-w-[300px]"
            />
          ) : (
            <img
              src={noImage}
              alt="placeholder image"
              width="249px"
              height="166px"
            />
          )}
        </div>
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{
            __html: description
              ? description
              : commonDataAttributes?.standfirst,
          }}
        />
        {phone && (
          <a href={`tel:${phone}`} className="text-center">
            {phone}
          </a>
        )}
        <div className="flex justify-center">
          <Button
            as="a"
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            secondary
          >
            {`See Website >`}
          </Button>
        </div>
      </div>
    </Section>
  );
};

export default SidebarTourOperator;
