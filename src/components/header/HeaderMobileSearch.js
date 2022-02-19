import React, { useState, Fragment } from "react";
import clsx from "clsx";
import { FaSearch as Search } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { Button } from "../ui-components";
import { Transition, Dialog } from "@headlessui/react";
import { navigate } from "@reach/router";

export const HeaderMobileSearch = ({ className, ...props }) => {
  const [searchText, setSearchtext] = useState("");
  const [open, setOpen] = useState(false);
  return (
    <div className={clsx("z-50", className)} {...props}>
      <button aria-label="search" onClick={() => setOpen(true)}>
        <Search
          className={clsx(
            "text-white text-f-22 hover:text-lightBlue, transition duration-300"
          )}
        />
      </button>
      <Transition show={open} as={Fragment}>
        <Dialog
          as="div"
          static
          className={clsx("fixed inset-0 overflow-hidden", "z-20")}
          open={open}
          onClose={setOpen}
        >
          <div className={clsx("absolute inset-0 overflow-hidden")}>
            {/* Overlay */}
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay
                className={clsx(
                  "absolute inset-0",
                  "transition-opacity",
                  "bg-darkBlue bg-opacity-80"
                )}
              />
            </Transition.Child>
            <div
              className={clsx(
                "fixed inset-x-0 top-[52px] sm:top-[67px]",
                "flex",
                "max-w-full"
              )}
            >
              {/* Sliding search */}
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="-translate-y-full"
                enterTo="-translate-y-0"
                leave="transform transition ease-in-out duration-500 "
                leaveFrom="-translate-y-0"
                leaveTo="-translate-y-full"
              >
                <div className={clsx("relative", "w-screen max-w-full")}>
                  <div>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        navigate(`/search/?q=${searchText}`, { replace: true });
                      }}
                      className="relative w-full focus:outline-none"
                    >
                      <input
                        type="text"
                        aria-label="search"
                        placeholder=""
                        value={searchText}
                        onChange={(event) =>
                          setSearchtext(event.currentTarget.value)
                        }
                        className={clsx(
                          "w-full h-14",
                          "border border-grey2 bg-white text-lg ",
                          "focus:outline-none focus:border-none focus:ring-2 focus:ring- focus:ring-lightBlue focus:ring-inset"
                        )}
                      />
                      <Button
                        aria-label="search"
                        className={clsx(
                          "absolute right-0 top-0",
                          "h-14 w-14 !p-0"
                        )}
                      >
                        <IoSearch className={clsx("text-f-28 text-grey4")} />
                      </Button>
                    </form>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};
