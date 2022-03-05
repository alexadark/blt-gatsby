import React from "react";
import clsx from "clsx";
import { FaTrashAlt as Trash } from "react-icons/fa";
import { Button } from "..";
import useLocalStorage from "../../lib/hooks/use-local-storage";
import useAuth from "~/context/AuthContext";
import useAuthModal from "~/context/AuthModalContext";

export const AddToBlButton = ({
  className = null,
  placeTop = false,
  addToBl,
  add = false,
  remove = false,
  ...props
}) => {
  const [bucket] = useLocalStorage("bucketList", []);
  const { loggedIn } = useAuth();
  const { openModal } = useAuthModal();

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
          { "whitespace-nowrap": placeTop },
          className
        )}
        onClick={() => {
          addToBl();

          if (
            (bucket.length === 1 || bucket.length === 9) &&
            add === true &&
            !loggedIn
          ) {
            openModal();
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
          <img src="/images/cross.svg" alt="add to bucket list " {...props} />
        ) : (
          <Trash className="text-gold text-[20px]" />
        )}
      </Button>
    </>
  );
};
