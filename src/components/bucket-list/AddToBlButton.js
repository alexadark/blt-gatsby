import React, { useState } from "react";
// import { Button } from 'components'
import clsx from "clsx";
import { FaTrashAlt as Trash } from "react-icons/fa";
import { Button } from "..";
import useLocalStorage from "../../lib/hooks/use-local-storage";
import { useAuth } from "../../lib/hooks/useAuth";
import { AuthModal } from "../auth";

export const AddToBlButton = ({
  className = null,
  placeTop = false,
  addToBl,
  add = false,
  remove = false,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [bucket] = useLocalStorage("bucketList", []);
  const { loggedIn } = useAuth();

  return (
    <>
      <Button
        type="button"
        secondary
        className={clsx(
          {
            "w-10 h-10 !p-0 !bg-transparent cursor-pointer hover:!bg-lightBlue":
              !placeTop,
          },
          { className: !placeTop },
          { "whitespace-nowrap": placeTop }
        )}
        onClick={() => {
          addToBl();

          if (
            (bucket.length === 1 || bucket.length === 9) &&
            add === true &&
            !loggedIn
          ) {
            setIsOpen(true);
          }
        }}
      >
        {placeTop ? (
          add ? (
            `Add +`
          ) : (
            `Remove -`
          )
        ) : add ? (
          <img src="/images/cross.svg" alt="add to bucket list" {...props} />
        ) : (
          <Trash className="text-gold text-[20px]" />
        )}
      </Button>
      <AuthModal isOpen={isOpen} setIsOpen={setIsOpen} warning />
    </>
  );
};
