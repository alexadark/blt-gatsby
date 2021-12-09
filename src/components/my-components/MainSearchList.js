import { connectRefinementList } from "react-instantsearch-dom";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import qs from "query-string";
import isEmpty from "lodash/isEmpty";
import isBrowser from "./../../utils/isBrowser";

const MainSearchList = (props) => {
  const {
    values,
    currentRefinement,
    items,
    refine,
    setMainState,
    setTotalSearchHit,
  } = props;
  const [dataFound, setDataFound] = useState(false);
  const [searchResultCount, setSearchResultCount] = useState({
    All: 0,
    Experience: 0,
    PlaceToStay: 0,
    Destination: 0,
    RoundUp: 0,
    Itinerary: 0,
  });
  useEffect(() => {
    if (dataFound) return;
    const AllTotal = items.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.count;
    }, 0);
    //console.log(items);
    const getTabTotal = items
      .map((item) => {
        const lab = item.label;
        const cou = item.count;
        return { [lab]: cou };
      })
      .reduce(
        (p, c) => {
          return {
            ...p,
            ...c,
          };
        },
        { All: AllTotal }
      );
    setTotalSearchHit(AllTotal);
    setSearchResultCount(getTabTotal);
    setDataFound(items?.length ? true : false);
  }, [items]);
  useEffect(() => {
    const parsed = qs.parse(window.location.search);
    if (isEmpty(parsed) || !parsed.tab) {
      const url = new URL(window.location.href);
      url.searchParams.set("tab", "All");
      window.history.pushState(null, "", url);
    }
    if (parsed.tab) {
      setMainState(parsed.tab);
      values.map((item) => {
        if (item.value === parsed.tab) {
          refine([item.value]);
        }
      });
    }
  }, []);

  return (
    <div>
      <ul className="ais-RefinementList-list grid md:grid-cols-6 grid-cols-2 sm:grid-cols-3 gap-4 uppercase">
        <li className="border text-center">
          <button
            className={clsx(
              "all-button h-[45px] sm:h-[54px] md:min-w-1/6 sm:min-w-1/3 min-w-1/2 w-full  hover:bg-gold ",
              {
                "bg-gold ": !currentRefinement.length,
              }
            )}
            onClick={() => {
              refine([]);
              setMainState("All");
              if (isBrowser()) {
                const url = new URL(window.location.href);
                url.searchParams.set("tab", "All");
                window.history.pushState(null, "", url);
              }
            }}
          >
            All
            <span className="ml-1">[{searchResultCount["All"]}]</span>
          </button>
        </li>

        {values.map((staticItem) => {
          const { isRefined } = items.find(
            (item) => item.label === staticItem.label
          ) || {
            isRefined: false,
          };

          return (
            <li className="border text-center" key={staticItem.value}>
              <button
                className={clsx(
                  "button h-[45px] sm:h-[54px] md:min-w-1/6sm:min-w-1/3 min-w-1/2 w-full  hover:bg-gold ",
                  {
                    "bg-gold": isRefined,
                  }
                )}
                onClick={() => {
                  refine([staticItem.value]);
                  setMainState(staticItem.value);
                  if (isBrowser()) {
                    const url = new URL(window.location.href);
                    url.searchParams.set("tab", staticItem.value);
                    window.history.pushState(null, "", url);
                  }
                }}
              >
                {staticItem.label}
                <span className="ml-1">
                  [{searchResultCount[staticItem.value]}]
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default connectRefinementList(MainSearchList);
