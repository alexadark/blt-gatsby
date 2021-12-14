import React from "react"
import { StarIcons } from "../ui-components"

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

         <div className={`flex mt-4 text-grey4 ${card && 'md:hidden'} ${className ? className : ""}`}>
         {
           `Ages: ${!age ? "Any " : age + "+ "}`}
           {priceFrom ? ` |  Price from: ${priceFrom.toLowerCase() === "varies" ? priceFrom : "£" + priceFrom }`: `  | Price: Free`}
           {duration && ` | Duration: ${duration}`}
           {whenIsIt && ` | When: ${whenIsIt}`}
       </div>
      )}
    </>
  )
}
