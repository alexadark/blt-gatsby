import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import { GiHamburgerMenu as Hamburger } from "react-icons/gi";
import { MdClose as Close } from "react-icons/md";
import { Branding } from "./Branding";
import { Link, useStaticQuery, graphql } from "gatsby";
import { Button } from "..";
import useAuth from "~/context/AuthContext";
import useAuthModal from "~/context/AuthModalContext";
const MOBILE_MENU_QUERY = graphql`
  query {
    mobileMenuData: allWpMenuItem(filter: { locations: { eq: MOBILE } }) {
      nodes {
        ...MenuItem
      }
    }
    mobileLogguedMenuData: allWpMenuItem(
      filter: { locations: { eq: MOBILELOG } }
    ) {
      nodes {
        ...MenuItem
      }
    }
  }
`;

export const MobileMenu = ({ className, ...props }) => {
  const [open, setOpen] = useState(false);
  const data = useStaticQuery(MOBILE_MENU_QUERY);
  const { mobileMenuData, mobileLogguedMenuData } = data;
  const { nodes: items } = mobileMenuData || [];
  const { nodes: logguedItems } = mobileLogguedMenuData || [];
  const { user } = useAuth();
  const { openModal } = useAuthModal();
  const menuItems = user ? logguedItems : items;

  return (
    <div className={clsx(className)} {...props}>
      {/*<button aria-label="open menu">*/}
      <Hamburger
        className={clsx("text-[24px] text-white")}
        onClick={() => setOpen(true)}
      />
      {/*</button>*/}

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
              className={clsx("fixed inset-y-0 right-0", "flex", "max-w-full")}
            >
              {/* Sliding panel */}
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div
                  className={clsx(
                    "relative",
                    "w-screen max-w-full md:max-w-md"
                  )}
                >
                  {/* Panel content */}
                  <div
                    className={clsx(
                      "flex flex-col",
                      "h-screen",
                      "overflow-y-scroll",
                      "bg-darkBlue shadow-xl",
                      "z-50"
                    )}
                  >
                    <div className="flex items-center justify-between px-4 py-2 border-b border-white border-opacity-25">
                      <Branding />
                      <button className={clsx("")} aria-label="close menu">
                        <Close
                          className="text-[35px] text-white"
                          onClick={() => setOpen(false)}
                        />
                      </button>
                    </div>

                    <nav className={`px-4`}>
                      {menuItems?.map((item) => {
                        const { label, path, cssClasses, id } = item;

                        return (
                          <Fragment key={id}>
                            {cssClasses?.includes("button") ||
                            cssClasses?.includes("sign") ? (
                              <div
                                className={`py-4 border-b border-grey3 last:border-none`}
                              >
                                {cssClasses?.includes("sign") ? (
                                  <Button
                                    className={`h-10 text-f-14`}
                                    onClick={() => {
                                      setOpen(false);
                                      openModal();
                                    }}
                                  >
                                    {label}
                                  </Button>
                                ) : (
                                  <Link
                                    to={path}
                                    className=""
                                    onClick={() => setOpen(false)}
                                  >
                                    <Button className="h-10 text-f-14">
                                      {label}
                                    </Button>
                                  </Link>
                                )}
                              </div>
                            ) : (
                              <Link
                                key={id}
                                to={path}
                                className={clsx(
                                  "menuItem",
                                  "block",
                                  "text-white text-base uppercase tracking-[1.14px] hover:text-gold hover:no-underline",
                                  "py-4",
                                  "border-b border-grey3 last:border-none"
                                )}
                                onClick={() => setOpen(false)}
                              >
                                {label}
                              </Link>
                            )}
                          </Fragment>
                        );
                      })}
                    </nav>
                  </div>
                  {/* End of panel content */}
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};
