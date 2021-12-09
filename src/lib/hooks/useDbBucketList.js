import { useEffect } from "react";

import { GET_BUCKET_LIST } from "../queries";
import { useLazyQuery } from "@apollo/client";
import { useAuth } from "./useAuth";

export const useDbBucketList = () => {
  const { user } = useAuth();
  const [getBucketList, { called, loading, data, error }] = useLazyQuery(
    GET_BUCKET_LIST,
    {
      variables: { author: user?.databaseId },
    }
  );

  useEffect(() => {
    getBucketList();
  }, []);

  const bl = data?.bucketLists?.nodes[0];
  const blId = bl?.databaseId;
  const blItems = bl?.bucketListElements?.blLinks;
  const blItemsIds = blItems?.map((item) => item?.databaseId);

  return {
    data,
    error,
    loading,
    called,
    getBucketList,
    bl,
    blItems,
    blId,
    blItemsIds,
  };
};
