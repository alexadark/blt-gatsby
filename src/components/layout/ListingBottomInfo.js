import React from "react";
import { StarIcons } from "../ui-components";

export const ListingBottomInfo = ({
  starRating,
  age,
  priceFrom,
  duration,
  whenIsIt,
  card,
  className,
}) => {
  return (
    <>
      {starRating ? (
        <div>
          <StarIcons stars={parseInt(starRating)} small card={card} />
        </div>
      ) : (
        <div
          className={`flex mt-4 text-grey4 ${card && "md:hidden"} ${
            className ? className : ""
          }`}
        >
          {`Min age: ${!age ? "Any " : age + "+ "}`}
          {priceFrom
            ? ` | ${
                priceFrom.toLowerCase() === "varies"
                  ? priceFrom
                  : "£" + priceFrom
              }`
            : `  | Free`}
          {duration && ` | ${duration}`}
          {whenIsIt && ` | ${whenIsIt}`}
        </div>
      )}
    </>
  );
};
