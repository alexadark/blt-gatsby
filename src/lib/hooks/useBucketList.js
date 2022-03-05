import React from "react";
import toast from "react-hot-toast";
import useLocalStorage from "./use-local-storage";

export const useBucketList = (item) => {
  const [bucket, setBucket] = useLocalStorage("bucketList", []);

  const isAdded =
    item?.__typename === "WpRoundUp_Roundupdataattributes_links"
      ? bucket?.find((i) =>
          i.__typename === "WpRoundUp_Roundupdataattributes_links"
            ? i.link[0].id === item.link[0].id
            : i.id === item.link[0].id
        )
      : bucket?.find((i) => i.id === item.id);
  const addToBl = () => {
    setBucket([...bucket, item]);
    toast.custom(
      <div className="bg-gold flex items-center px-2 py-1 rounded shadow-lg text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
        </svg>
        <span className="ml-2 text-lg text-gray-900">Added to bucket list</span>
      </div>,
      {
        duration: 1000,
      }
    );
  };

  const removeFromBl = () => {
    const newBucket =
      item.__typename === "WpRoundUp_Roundupdataattributes_links"
        ? bucket.filter((i) => {
            return i.__typename === "WpRoundUp_Roundupdataattributes_links"
              ? i.link[0].id !== item.link[0].id
              : i.id !== item.link[0].id;
          })
        : bucket.filter((i) => i.id !== item.id);

    setBucket(newBucket);
    toast.custom(
      <div className="bg-gold flex items-center px-2 py-1 rounded shadow-lg text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
        </svg>
        <span className="ml-2 text-lg text-gray-900">
          Removed from bucket list
        </span>
      </div>,
      {
        duration: 1000,
      }
    );
  };

  return { addToBl, removeFromBl, isAdded };
};
