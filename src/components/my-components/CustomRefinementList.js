import { connectRefinementList } from "react-instantsearch-dom";
import clsx from "clsx";
import React, { useState } from "react";
import { Button } from "../ui-components/Button";
import { WithCollapse } from "../ui-components/WithCollapse";
import { FaChevronDown } from "react-icons/fa";

const CustomRefinementList = (props) => {
  const {
    values,
    currentRefinement,
    items,
    refine,
    title = "CONTINENT",
    className,
  } = props;
  const [open, setOpen] = useState(false);
  const [arraySize, setArraySize] = useState(4);
  const [openFilterSet, setOpenFilterSet] = useState(false);
  if (!values) {
    return null;
  }

  const filteredValues = values.sort(function (a, b) {
    var nameA = a.label.toUpperCase();
    var nameB = b.label.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  return (
    <div className={className}>
      <div className="py-4 border-b border-grey2">
        {/* Title */}
        <div className="flex justify-between">
          <h4 className="uppercase text-[15px] tracking-wider text-grey5 mb-2">
            {title}
          </h4>
          <FaChevronDown
            className={clsx(
              "w-8 h-6 lg:hidden text-lightBlue",
              "transition duration-500",
              { "transform rotate-180": openFilterSet }
            )}
            onClick={(e) => {
              e.preventDefault();
              setOpenFilterSet(!openFilterSet);
            }}
          />
        </div>
        <WithCollapse
          isOpen={openFilterSet}
          className="duration-500 ease-in-out transition-height"
        >
          <ul>
            {!!filteredValues &&
              filteredValues.slice(0, arraySize).map((staticItem) => {
                const { isRefined } = items.find(
                  (item) => item.label === staticItem.label
                ) || {
                  isRefined: false,
                };
                const countArray = items.map((item) => {
                  if (item.label === staticItem.label) return item.count;
                  return 0;
                });
                const count = countArray.reduce(
                  (previousValue, currentValue) => {
                    return previousValue + currentValue;
                  },
                  0
                );
                return (
                  <li
                    className={clsx("item", {
                      "opacity-50 cursor-not-allowed ": !count,
                    })}
                    key={staticItem.value}
                  >
                    <label
                      className={clsx(
                        "input-item leading-tight text-grey4 undefined",
                        {
                          "cursor-not-allowed ": !count,
                        }
                      )}
                    >
                      <input
                        type="checkbox"
                        value={staticItem.value}
                        checked={isRefined}
                        className={clsx(
                          "input-item border-2 rounded-none text-gold form-checkbox border-grey2 w-5 h-5 mr-4",
                          {
                            "cursor-not-allowed ": !count,
                          }
                        )}
                        disabled={!count}
                        onChange={(event) => {
                          const value = event.currentTarget.value;
                          const next = currentRefinement.includes(value)
                            ? currentRefinement.filter(
                                (current) => current !== value
                              )
                            : currentRefinement.concat(value);

                          refine(next);
                        }}
                      />
                      {staticItem.label} <span className="ml-1">[{count}]</span>
                    </label>
                  </li>
                );
              })}
            {!!filteredValues && filteredValues.length > 0 && (
              <>
                <Button
                  small
                  secondary
                  className="mt-2"
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(!open);
                    setArraySize(arraySize == 4 ? filteredValues.length : 4);
                  }}
                  css={{
                    "&:hover": {
                      svg: { color: "white" },
                    },
                  }}
                >
                  {open ? "close" : "show all"}{" "}
                  <FaChevronDown
                    className={clsx(
                      "transition duration-500",
                      "ml-1",
                      "text-lightBlue  text-[11px]",
                      { "transform rotate-180": open }
                    )}
                  />
                </Button>
              </>
            )}
          </ul>
        </WithCollapse>
      </div>
    </div>
  );
};
export default connectRefinementList(CustomRefinementList);
