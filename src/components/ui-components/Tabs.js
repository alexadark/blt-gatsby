// @ts-nocheck
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import slugify from "slugify";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { Button } from "./Button";

export const Tabs = ({ tabs = [], className, mapOpen, ...props }) => {
  return (
    <div
      className={clsx(
        // 'flex flex-wrap justify-start -mx-1 md:justify-between sm:flex-nowrap',
        `grid ${
          tabs.length === 6 ? "md:grid-cols-6" : "md:grid-cols-5"
        } grid-cols-2 sm:grid-cols-3 gap-1`,
        className
      )}
      {...props}
    >
      {tabs?.map((tab) => {
        if (tab.name != "map") {
          return <LinkTabs key={tab.name} name={tab.name} />;
        } else if (tab.name == "map") {
          return (
            <Button
              key={tab.name}
              className={clsx("h-[54px]", "!text-grey4")}
              onClick={mapOpen}
              tab="true"
            >
              {tab.name}
            </Button>
          );
        }
      })}
    </div>
  );
};

const LinkTabs = ({ name }) => {
  const [isLinkExist, setIsLinkExist] = useState(false);
  useEffect(() => {
    var tabLink = document.getElementById(slugify(name.toLowerCase()));
    if (tabLink) {
      setIsLinkExist(true);
    }
  }, []);
  return (
    <Button
      as={isLinkExist ? AnchorLink : null}
      data-anchor-url-exisr={isLinkExist.toString()}
      data-anchor-url={slugify(name.toLowerCase())}
      tab="true"
      className={clsx(
        "h-[54px]",

        "!text-grey4"
      )}
      key={name}
      href={`#${slugify(name.toLowerCase())}`}
    >
      {name}
    </Button>
  );
};
