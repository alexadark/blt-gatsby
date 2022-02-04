import React from "react";
import { connectInfiniteHits } from "react-instantsearch-dom";
import clsx from "clsx";
import { Button } from "../ui-components/Button";
import { useMediaQuery } from "../../lib/hooks";
import { Section } from "..";
import { Listing } from "../layout/Listing";
import { ListingCard } from "../layout/ListingCard";
import { NoResults } from "../search";
const SearchHit = ({ hits, hasMore, view, refineNext }) => {
  let listView = view || "list";

  const results = hits;


  const isList = useMediaQuery("(min-width:768px)");

  return (
    <>
      {results.length === 0 ? (
        <NoResults
          className="mt-10"
          title=" Sorry - we have no recommendations for that search term. Please try
    again"
        />
      ) : (
        <>
          {listView === "list" && isList && (
            <Section className={clsx("p-5 md:p-8  mb-base2")}>
              {results.map((item) => {
                const { id, nodeType } = item;


                return (
                  <Listing
                    key={id}
                    item={item}
                    search
                    pts={nodeType === "PlaceToStay"}
                    itinerary={nodeType === "Itinerary"}
                    roundUp={nodeType === "RoundUp"}
                    noBl={nodeType === "RoundUp"}
                    // destination={nodeType === "Destination"}
                  />
                );
              })}
            </Section>
          )}
          {(listView === "grid" || !isList) && (
            <div
              className={clsx(
                "grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 gap-10"
              )}
            >
              {results?.map((item) => {
                const { id, nodeType } = item;
                return (
                  <div className="flex justify-center" key={id}>
                    <ListingCard
                      item={item}
                      itinerary={nodeType === "Itinerary"}
                      pts={nodeType === "PlaceToStay"}
                      roundUp={nodeType === "RoundUp"}
                      noBl={nodeType === "RoundUp"}
                    />
                  </div>
                );
              })}
            </div>
          )}

          <div className={clsx("flex justify-center mt-6")}>
            <Button
              disabled={!hasMore}
              onClick={refineNext}
              className={clsx("h-10 block", {
                "!hidden": !hasMore,
              })}
            >
              Load More
            </Button>
          </div>
        </>
      )}
    </>
  );
};
export default connectInfiniteHits(SearchHit);
