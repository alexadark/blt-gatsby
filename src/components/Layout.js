import React from "react";
// import { HelmetForFavicon } from "./HelmetForFavicon";
import clsx from "clsx";
import { Header } from "./header/Header";
import { Footer } from "./footer";

export const Layout = ({
  children,
  page = undefined,
  type = "page",
  ...props
}) => {
  const layoutClass = page !== undefined ? (page.slug ? page.slug : page) : "";
  const pageTemplate = page?.headlesswp?.pageTemplate;

  const fullWidthClass = pageTemplate === "full width" ? "fullWidth" : "";

  return (
    <>
      {/* <HelmetForFavicon /> */}
      <div
        className={clsx(
          "flex min-h-full flex-col",
          `${layoutClass}-${type}`,
          fullWidthClass
        )}
        css={{
          "&.fullWidth": {
            ".mainContainer": {
              maxWidth: `100%`,
              form: {
                marginBottom: 10,
              },
              padding: 0,
            },
          },
        }}
        {...props}
      >
        <Header />

        {children}
        <Footer />
      </div>
    </>
  );
};
