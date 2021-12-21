import React from "react";
import { Menu } from "./Menu";
import { MobileMenu } from "./MobileMenu";
import { HeaderSearch } from "./HeaderSearch";
import { HeaderMobileSearch } from "./HeaderMobileSearch";
import clsx from "clsx";
import { window } from "browser-monads";
import { Toaster } from "react-hot-toast";
import { Branding } from "./Branding";

export const Header = () => {
  const path = window?.location?.pathname;

  return (
    // <Headroom>
    <header id="header" className="relative py-3 bg-darkBlue">
      <div
        className={clsx(
          "flex items-center justify-between",
          "container max-w-big",
          "px-5 sm:py-0 2xl:px-0 "
        )}
      >
        <Branding />
        {path !== "/" && !path?.includes("search") && path !== "/404" && (
          <HeaderSearch className="hidden xl:block" />
        )}
        <div className="flex items-center space-x-5">
          <Menu className="hidden lg:flex" />
          {path !== "/" && !path?.includes("search") && path !== "/404" && (
            <HeaderMobileSearch className="hidden mr-5 lg:block xl:hidden" />
          )}
        </div>
        <div className={clsx("lg:hidden", "flex space-x-5")}>
          {path !== "/" && !path?.includes("search") && path !== "/404" && (
            <HeaderMobileSearch />
          )}
          <MobileMenu />
        </div>
      </div>
      <div className="toster">
        <Toaster
          containerClassName="!top-2/4"
          position="top-center"
          reverseOrder={false}
        />
      </div>
    </header>
    // </Headroom>
  );
};
