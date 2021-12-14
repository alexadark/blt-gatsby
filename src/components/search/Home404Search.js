import React, { useState } from "react";
import { useMediaQuery } from "../../lib/hooks";
import clsx from "clsx";
import { Button } from "../ui-components";
import { FaSearch } from "react-icons/fa";
import { Link } from "gatsby";
import { navigate } from "@reach/router";

export const Home404Search = () => {
  const isSmall = useMediaQuery("(max-width:640px)");
  const [searchText, setSearchtext] = useState("");
  return (
    <div className="w-auto lg:w-[950px] mx-auto z-10">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate(`/search/?q=${searchText}`, { replace: true });
        }}
        className="relative mb-4"
      >
        <input
          type="text"
          value={searchText}
          onChange={(event) => setSearchtext(event.currentTarget.value)}
          placeholder={
            isSmall
              ? "destinations | experiences | places to stay"
              : "Search for experiences, destinations & places to stay"
          }
          className={clsx(
            "bg-white border-none shadow-input pl-6",
            " text-base sm:text-f-18 lg:text-f-26 placeholder-grey3 focus:placeholder-transparent font-bold",
            "w-full h-10 sm:h-20"
          )}
        />
        <Button
          className={clsx(
            "w-10 h-10 sm:h-[65px] sm:w-[135px] !p-0",
            "absolute right-0 top-0 sm:right-2 sm:top-2",
            "flex items-center justify-center"
          )}
        >
          <FaSearch className="text-grey4 text-f-18 sm:text-[38px]" />
        </Button>
      </form>
      <Link
        to="/search"
        className="block sm:mt-10 text-base font-normal tracking-wider underline uppercase text-lightBlue sm:text-f-24 text-shadow-sm"
        css={{ textShadow: "1px 2px 4px #000" }}
      >
        {isSmall
          ? "Browse all recommendations"
          : "BROWSE ALL RECOMMENDATIONS & filter"}
      </Link>
    </div>
  );
};
