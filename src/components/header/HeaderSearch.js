import React, { useState } from "react";
import clsx from "clsx";
import { FaSearch as Search } from "react-icons/fa";
import { useMediaQuery } from "../../lib/hooks";
import { navigate } from "@reach/router";

export const HeaderSearch = ({ className, ...props }) => {
  const isLarge = useMediaQuery("(min-width: 1350px)");
  const [searchText, setSearchtext] = useState("");
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate(`/search/?q=${searchText}`, { replace: true });
        }}
        className={clsx("relative", className)}
        {...props}
      >
        <input
          type="text"
          placeholder=""
          aria-label="search"
          value={searchText}
          onChange={(event) => setSearchtext(event.currentTarget.value)}
          className={clsx(
            "h-11 w-[360px] rounded-sm px-3",
            "border-none",
            " placeholder-grey3 focus:placeholder-transparent",
            { "!w-[420px]": isLarge }
          )}
        />
        <button
          className={clsx(
            "absolute right-0 top-0",
            "flex items-center justify-center",
            "h-11 w-11 bg-lightBlue hover:bg-veryLightBlue",
            "transition duration-300",
            "rounded-r-sm",
            "outline-none ring-0"
          )}
        >
          <Search className={clsx("text-grey5 text-f-18")} />
        </button>
      </form>
    </>
  );
};
