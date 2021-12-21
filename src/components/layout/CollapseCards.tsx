import React, { useState, useRef, useEffect } from "react";
import Collapse from "@kunukn/react-collapse";
import clsx from "clsx";
import { Button } from "..";
import { ListingCard } from "./ListingCard";
import { AffiliateCard } from "./AffiliateCard";

export const CollapseCards = ({
  cards,
  className,
  noBl,
  pts,
  itinerary,
  writer,
  nested,
  affiliate,
  ...props
}: any) => {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState(2);
  const collapseContainer = useRef(null);

  useEffect(() => {
    const currentElm = collapseContainer?.current;
    if (state == 2) return;
    if (!open && state % 2 == 0) {
      currentElm.scrollIntoView();
    }
  }, [open]);
  return (
    <div
      className={clsx(
        `flex justify-center flex-col items-center md:justify-start gap-12 relative ${
          open && "mb-14"
        }`,
        className
      )}
      {...props}
    >
      {cards?.slice(0, 4).map((item: any) => {
        return (
          <div className="flex justify-center" key={item.id}>
            {affiliate ? (
              <AffiliateCard item={item} key={item.product_code} />
            ) : (
              <ListingCard
                key={item.id}
                item={item}
                noBl={noBl}
                itinerary={itinerary}
                writer={writer}
                pts={pts}
                nested={nested}
              />
            )}
          </div>
        );
      })}
      <div ref={collapseContainer}>
        {cards?.length > 4 && (
          <>
            <Collapse
              isOpen={open}
              className="duration-500 ease-in-out transition-height"
            >
              <div className="flex flex-wrap justify-center gap-12 md:justify-start">
                {cards?.slice(4).map((item: any, index) => {
                  const isLastRow =
                    index === cards.length - 5 ||
                    index + 1 === cards.length - 5;
                  return (
                    <div
                      className={`${
                        isLastRow ? "mb-3" : ""
                      } flex justify-center `}
                      key={item.id}
                    >
                      {affiliate ? (
                        <AffiliateCard item={item} key={item.product_code} />
                      ) : (
                        <ListingCard
                          item={item}
                          key={item.id}
                          noBl={noBl}
                          itinerary={itinerary}
                          writer={writer}
                          pts={pts}
                          nested={nested}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </Collapse>
            <div
              className={`flex justify-center w-full absolute left-0  ${
                open ? "-bottom-10" : "-bottom-3"
              }`}
            >
              <Button
                small
                // className="w-[150px]"
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(!open);
                  if (open) {
                    setState(state + 2);
                  }
                }}
              >
                {open ? "Show less" : "Show more"}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
