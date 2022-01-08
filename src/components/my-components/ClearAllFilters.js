import { connectCurrentRefinements } from "react-instantsearch-dom";
import React from "react";
import { Button } from "../ui-components/Button";
import isBrowser from "../../utils/isBrowser";
const ClearAllFilters = ({ items, refine }) => {
  return (
    <Button
      onClick={() => {
        refine(items);
        if (isBrowser()) {
          const url = new URL(window.location.href);
          url.searchParams.set("tab", "All");
          window.history.pushState(null, "", url);
        }
      }}
      disabled={!items.length}
      secondary
      small
    >
      Reset all
    </Button>
  );
};
export default connectCurrentRefinements(ClearAllFilters);
