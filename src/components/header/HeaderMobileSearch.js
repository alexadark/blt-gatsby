import React, { useState } from "react";
import clsx from "clsx";
import { FaSearch as Search } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { Button } from "../ui-components";
import { Disclosure, Transition } from "@headlessui/react";
import { navigate } from "@reach/router";

export const HeaderMobileSearch = ({ className, ...props }) => {
  const [searchText, setSearchtext] = useState("");
  return (
    <div className={clsx("z-50", className)} {...props}>
      <Disclosure>
        <Disclosure.Button>
          <span aria-label="search">
            <Search
              className={clsx(
                "text-white text-f-22 hover:text-lightBlue, transition duration-300"
              )}
            />
          </span>
        </Disclosure.Button>
        <Transition
          enter="transition duration-300 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition duration-200 ease-out"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Disclosure.Panel>
            <div className="absolute inset-0 top-[63px] sm:top-[79px] w-full">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  navigate(`/search/?q=${searchText}`, { replace: true });
                }}
                className="relative w-full"
              >
                <input
                  type="text"
                  aria-label="search"
                  placeholder="What are you looking for?"
                  value={searchText}
                  onChange={(event) => setSearchtext(event.currentTarget.value)}
                  className={clsx(
                    "w-full h-12",
                    "border border-grey2 bg-white focus:placeholder-transparent"
                  )}
                />
                <Button
                  aria-label="search"
                  className={clsx("absolute right-0 top-0", "h-12 w-12 !p-0")}
                >
                  <IoSearch className={clsx("text-f-24 text-grey4")} />
                </Button>
              </form>
            </div>
          </Disclosure.Panel>
        </Transition>
      </Disclosure>
    </div>
  );
};
