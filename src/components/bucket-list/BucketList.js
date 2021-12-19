import React from "react";
import uniq from "lodash/uniq";
import { CollapseSection } from "..";
import { CardsGrid } from "../layout/CardsGrid";
import { CollapseListings } from "../layout/CollapseListings";
import { NoResults } from "../search";

const BucketList = ({ items }) => {
  const roundUpsItems = items?.filter(
    (item) => item.__typename === "WpRoundUp_Roundupdataattributes_links"
  );
  const otherItems = items?.filter(
    (item) => item.__typename !== "WpRoundUp_Roundupdataattributes_links"
  );
  const roundUpsCountries = roundUpsItems?.map(
    (item) => item.link[0].commonDataAttributes?.country?.name
  ) || ["1"];

  const otherCountries = otherItems?.map(
    (item) => item.commonDataAttributes?.country?.name
  ) || ["1"];

  const countries = uniq([...roundUpsCountries, ...otherCountries]);

  return (
    <>
      {items?.length > 0 ? (
        countries?.map((country, i) => {
          const countryRoundUps = roundUpsItems.filter(
            (item) =>
              item.link[0].commonDataAttributes?.country?.name === country
          );

          const otherItemsByCountry = otherItems.filter(
            (item) => item?.commonDataAttributes?.country?.name === country
          );
          const allItems = [...countryRoundUps, ...otherItemsByCountry];
          return (
            <CollapseSection title={country} key={i} listings>
              <div className="mt-5">
                <CollapseListings listings={allItems} />
                <CardsGrid cards={allItems} className="md:hidden" />
              </div>
            </CollapseSection>
          );
        })
      ) : (
        <NoResults
          title="Your bucket list is empty"
          subtitle="No-one should have an empty travel bucket list. Add something by clicking the plus icons on all of our recommendations - simple as that. Good luck!"
          className="mt-base2"
        />
      )}
    </>
  );
};

export default BucketList;
