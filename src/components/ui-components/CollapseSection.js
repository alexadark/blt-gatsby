import React, { useState, useEffect, useRef } from "react";
import { Transition } from "@headlessui/react";
import { FaChevronRight } from "react-icons/fa";
import clsx from "clsx";
import Collapse from "@kunukn/react-collapse";
import { Section, Typo, Button, Number } from ".";

export const CollapseSection = ({
  children,
  className,
  title,
  number,
  listings,
  ...props
}) => {
  // const min768 = useMediaQuery('(min-width: 768px)')

  // const isDefaultOpen = exists(window) ? min768 : undefined
  console.log(title);
  const [open, setOpen] = useState(true);
  const [buttonLocation, setButtonLocation] = useState(false);

  useEffect(() => {
    const isDefaultOpen = window.matchMedia("(min-width: 768px)").matches;
    !isDefaultOpen && setOpen(isDefaultOpen);
  }, []);

  const collapseContainer = useRef(null);
  useEffect(() => {
    const isDefaultOpen = window.matchMedia("(min-width: 768px)").matches;
    const currentElm = collapseContainer?.current;
    if (!open && !isDefaultOpen && buttonLocation) {
      currentElm.scrollIntoView();
    }
  }, [open]);
  return (
    <Section
      ref={collapseContainer}
      className={clsx(
        " py-5 sm:py-8 my-3 sm:my-base2 accordion",

        "transition-max-h duration-500   ease-out",
        { "px-4 sm:px-7": !listings },
        className
      )}
      {...props}
    >
      <>
        <div className={`flex justify-between ${listings && "px-4 sm:px-7"}`}>
          <div
            role="button"
            className="flex items-center cursor-pointer focus:outline-none"
            onClick={() => {
              setOpen(!open);
              setButtonLocation(false);
            }}
          >
            <div>
              <FaChevronRight
                className={clsx(
                  "transition duration-500",
                  "mr-5",
                  "text-lightBlue text-[25px] sm:text-[49px]",
                  { "transform rotate-90": open }
                )}
              />
            </div>

            <Typo>{title}</Typo>
          </div>
          {number && (
            <div>
              <Number number={number} />
            </div>
          )}
        </div>

        <Collapse
          isOpen={open}
          className={`duration-500 ease-in-out transition-height`}
        >
          <div className={clsx("pt-5")}>
            <Transition
              show={open}
              enter="transition duration-700 ease-out"
              enterFrom="opacity-0  transform -translate-y-4"
              enterTo="opacity-100 transform translate-y-0"
              leave="transition duration-300 ease-out"
              leaveFrom="opacity-100 transform translate-y-0"
              leaveTo="transform opacity-0 -translate-y-4"
            >
              <div className={clsx("overflow-hidden")}>
                {children}
                <div className="flex justify-center mt-base2 md:hidden">
                  <Button
                    small
                    onClick={() => {
                      setOpen(false);
                      setButtonLocation(true);
                    }}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </Transition>
          </div>
        </Collapse>
      </>
    </Section>
  );
};
