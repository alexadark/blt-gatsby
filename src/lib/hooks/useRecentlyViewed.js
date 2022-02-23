import React, { useEffect } from "react";
import useLocalStorage from "./use-local-storage";

export const useRecentlyViewed = (data) => {
  const [bucket, setBucket] = useLocalStorage("recentlyviewed", []);

  useEffect(() => {
    let haveThisInList = bucket?.some(
      (bucketItem) => bucketItem.id === data.id
    );
    if (!haveThisInList) {
      setBucket([...bucket, data]?.slice(0, 10));
    } else {
      const withOutCurrentItem = bucket.filter(
        (bucketItem) => bucketItem.id !== data.id
      );
      setBucket([...withOutCurrentItem, data]?.slice(0, 10));
    }
  }, []);
};
