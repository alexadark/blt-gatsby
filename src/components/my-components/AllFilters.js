import React from "react";
import CustomRefinementList from "./CustomRefinementList";
import RatingRefinementList from "./RatingRefinementList";
import clsx from "clsx";
export default function AllFilters({ facets, mainState }) {
  const shouldVisible = (list) => {
    return !list.includes(mainState);
  };

  return (
    <>
      <CustomRefinementList
        limit={40}
        state={mainState}
        values={facets["customDataAttributes.recommendationType"]}
        attribute="customDataAttributes.recommendationType"
        title="Recommendation Type"
        className={clsx({
          hidden: shouldVisible(["RoundUp"]),
        })}
      />
      <RatingRefinementList
        state={mainState}
        values={facets["customDataAttributes.rating"]}
        attribute="customDataAttributes.rating"
        orderAlphabetically={false}
        customOrderArray={["yes", "no"]}
        title="RATING"
        className={clsx({
          hidden: shouldVisible(["Experience"]),
        })}
      />
      <CustomRefinementList
        limit={40}
        state={mainState}
        values={facets["commonDataAttributes.continent"]}
        attribute="commonDataAttributes.continent"
        title="CONTINENT"
        className={clsx({
          hidden: shouldVisible([
            "All",
            "Experience",
            "PlaceToStay",
            "Destination",
            "RoundUp",
            "Itinerary",
          ]),
        })}
      />
      <CustomRefinementList
        limit={40}
        state={mainState}
        values={facets["customDataAttributes.setting"]}
        attribute="customDataAttributes.setting"
        title="SETTING"
        className={clsx({
          hidden: shouldVisible([
            "All",
            "Experience",
            "PlaceToStay",
            "Destination",
            "RoundUp",
            "Itinerary",
          ]),
        })}
      />
      <CustomRefinementList
        limit={40}
        state={mainState}
        values={facets["customDataAttributes.theme"]}
        attribute="customDataAttributes.theme"
        title="THEME"
        className={clsx({
          hidden: shouldVisible([
            "All",
            "Experience",
            "PlaceToStay",
            "RoundUp",
            "Itinerary",
          ]),
        })}
      />
      <CustomRefinementList
        limit={40}
        state={mainState}
        values={facets["customDataAttributes.whenAvailable"]}
        attribute="customDataAttributes.whenAvailable"
        title="WHEN AVAILABLE"
        orderAlphabetically={false}
        className={clsx({ hidden: shouldVisible(["Experience"]) })}
      />
      <CustomRefinementList
        limit={40}
        state={mainState}
        values={facets["customDataAttributes.bestTime"]}
        attribute="customDataAttributes.bestTime"
        title="BEST TIME"
        orderAlphabetically={false}
        className={clsx({
          hidden: shouldVisible([
            "All",
            "Experience",
            "Destination",
            "Itinerary",
          ]),
        })}
      />
      <CustomRefinementList
        limit={40}
        state={mainState}
        values={facets["customDataAttributes.whoFor"]}
        attribute="customDataAttributes.whoFor"
        title="Especially For"
        className={clsx({
          hidden: shouldVisible([
            "All",
            "Experience",
            "Itinerary",
            "PlaceToStay",
          ]),
        })}
      />
      <CustomRefinementList
        limit={40}
        state={mainState}
        values={facets["customDataAttributes.priceGuide"]}
        attribute="customDataAttributes.priceGuide"
        title="Price Guide"
        showAsSymbol={true}
        symbol="£"
        className={clsx({
          hidden: shouldVisible(["PlaceToStay"]),
        })}
      />
      <CustomRefinementList
        limit={40}
        state={mainState}
        values={facets["customDataAttributes.priceGuideExp"]}
        attribute="customDataAttributes.priceGuideExp"
        title="Price Guide"
        className={clsx({
          hidden: shouldVisible(["Experience"]),
        })}
      />
      <CustomRefinementList
        limit={40}
        state={mainState}
        values={facets["customDataAttributes.experienceType"]}
        attribute="customDataAttributes.experienceType"
        title="Experience Type"
        className={clsx({
          hidden: shouldVisible(["Experience"]),
        })}
      />
      <CustomRefinementList
        limit={40}
        state={mainState}
        values={facets["customDataAttributes.attractionType"]}
        attribute="customDataAttributes.attractionType"
        title="Attraction Type"
        className={clsx({
          hidden: shouldVisible(["Experience"]),
        })}
      />
      <CustomRefinementList
        limit={40}
        state={mainState}
        values={facets["customDataAttributes.activityType"]}
        attribute="customDataAttributes.activityType"
        title="Activity Type"
        className={clsx({
          hidden: shouldVisible(["Experience"]),
        })}
      />
      <CustomRefinementList
        limit={40}
        state={mainState}
        values={facets["customDataAttributes.eventType"]}
        attribute="customDataAttributes.eventType"
        title="Event Type"
        className={clsx({
          hidden: shouldVisible(["Experience"]),
        })}
      />
      <CustomRefinementList
        limit={40}
        state={mainState}
        values={facets["customDataAttributes.standard"]}
        attribute="customDataAttributes.standard"
        title="Standard"
        className={clsx({
          hidden: shouldVisible(["PlaceToStay"]),
        })}
      />
      <CustomRefinementList
        limit={40}
        state={mainState}
        values={facets["customDataAttributes.starRating"]}
        attribute="customDataAttributes.starRating"
        title="Star Rating"
        extraText="star"
        showAsSymbol={true}
        symbol="★"
        className={clsx({
          hidden: shouldVisible(["PlaceToStay"]),
        })}
      />
      <CustomRefinementList
        limit={40}
        state={mainState}
        values={facets["customDataAttributes.accommodationType"]}
        attribute="customDataAttributes.accommodationType"
        title="Accommodation Type"
        className={clsx({
          hidden: shouldVisible(["PlaceToStay"]),
        })}
      />
      <CustomRefinementList
        limit={40}
        state={mainState}
        values={facets["customDataAttributes.roomType"]}
        attribute="customDataAttributes.roomType"
        title="Room Type"
        className={clsx({
          hidden: shouldVisible(["PlaceToStay"]),
        })}
      />
      <CustomRefinementList
        limit={40}
        state={mainState}
        values={facets["customDataAttributes.hotelFacility"]}
        attribute="customDataAttributes.hotelFacility"
        title="Hotel Facility"
        className={clsx({
          hidden: shouldVisible(["PlaceToStay"]),
        })}
      />
      <CustomRefinementList
        limit={40}
        state={mainState}
        values={facets["customDataAttributes.roomFacility"]}
        attribute="customDataAttributes.roomFacility"
        title="Room Facility"
        className={clsx({
          hidden: shouldVisible(["PlaceToStay"]),
        })}
      />
      <CustomRefinementList
        limit={40}
        state={mainState}
        values={facets["customDataAttributes.forFamilies"]}
        attribute="customDataAttributes.forFamilies"
        title="For Families"
        className={clsx({
          hidden: shouldVisible(["PlaceToStay"]),
        })}
      />
      {/* {Inclusions missing} */}
      <CustomRefinementList
        limit={40}
        state={mainState}
        values={facets["customDataAttributes.skiFacilities"]}
        attribute="customDataAttributes.skiFacilities"
        title="Ski Facilities"
        className={clsx({
          hidden: shouldVisible(["PlaceToStay"]),
        })}
      />
      <CustomRefinementList
        limit={40}
        state={mainState}
        values={facets["customDataAttributes.brand"]}
        attribute="customDataAttributes.brand"
        title="brand"
        className={clsx({
          hidden: shouldVisible(["PlaceToStay"]),
        })}
      />
    </>
  );
}
