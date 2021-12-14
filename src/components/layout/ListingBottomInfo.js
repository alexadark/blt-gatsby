import React from "react"
import { StarIcons } from "../ui-components"

export const ListingBottomInfo = ({
  starRating,
  minAge,
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

         <div className={`flex mt-4 text-grey4 ${card && 'md:hidden'} ${className ? className : ""}`}>
         {minAge !== undefined &&
           `Ages: ${minAge === null ? "Any " : minAge + "+ "}`}
           {priceFrom ? ` |  Price from: ${priceFrom.toLowerCase() === "varies" ? priceFrom : "£" + priceFrom }`: `  | Price: Free`}
           {duration && ` | Duration: ${duration}`}
           {whenIsIt && ` | When: ${whenIsIt}`}
       </div>
      )}
    </>
  )
}
