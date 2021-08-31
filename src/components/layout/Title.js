import clsx from "clsx";
import React from "react";
import { Typo, Button, StarIcons } from "..";
import { useBucketList } from "../../lib/hooks/useBucketList";
import { AddToBlButton } from "../bucket-list/AddToBlButton";
import { window } from "browser-monads";

const Title = ({
  title,
  stars,
  intro,
  className,
  bl,
  item,
  handleEmpty,
  notEmpty,
  ...props
}) => {
  const { addToBl, removeFromBl, isAdded } = useBucketList(item || {});
  const path = window.location.pathname;
  const url = typeof window !== "undefined" ? window.location.href : "";
  console.log("url", url);

  return (
    <div
      className={clsx(
        "bg-veryLightGold py-4  pr-5 my-4 container max-w-big min-h-[160px] flex flex-col justify-center",
        className
      )}
      {...props}
    >
      <div className="ml-5 xl:ml-14">
        {intro && <div className={clsx("text-gold text-f-24")}>{intro}</div>}
        <div
          className={clsx({
            "max-w-[940px] gap-5 flex justify-between items-center": bl,
          })}
        >
          <Typo
            as="h1"
            h1
            className="max-w-[940px] -ml-1"
            dangerouslySetInnerHTML={{ __html: title }}
            css={{ span: { border: "3px solid #d3b27d", padding: "0 5px" } }}
          />
          {bl &&
            (isAdded ? (
              <div>
                <AddToBlButton remove addToBl={removeFromBl} />
              </div>
            ) : (
              <div>
                <AddToBlButton add addToBl={addToBl} />
              </div>
            ))}{" "}
          {path.includes("bucket") && notEmpty && (
            <Button secondary onClick={handleEmpty}>
              empty
            </Button>
          )}
        </div>

        {stars && <StarIcons stars={stars} />}
      </div>
    </div>
  );
};

export { Title };
