import React, { useState } from "react";
import { Typo } from "../ui-components";

export const TitleContent = ({
  title = null,
  content,
  className = "",
  ...props
}) => {
  let [isOpen, setIsOpen] = useState(false);
  let contentArray = content?.split(" ") ?? [];
  let contentArrayLength = contentArray?.length;
  let first75Words = contentArray?.slice(0, 75);
  if (!content) {
    return null;
  }

  return (
    <div {...props}>
      {title && (
        <Typo as="h3" h3 className={`mb-base ${className ? className : ""}`}>
          {title}
        </Typo>
      )}
      {contentArrayLength > 75 ? (
        <div>
          <div
            className="prose-lg"
            dangerouslySetInnerHTML={{
              __html: isOpen ? content : first75Words.join(" "),
            }}
          />
          <div className="buttons flex justify-center mt-2 sm:mt-0 sm:justify-start">
            {isOpen ? (
              <button
                onClick={() => setIsOpen(false)}
                className="showmore border-2 rounded border-lightBlue text-gray-800 text-lg p-2 px-6 sm:p-0 sm:border-0  sm:inline-block sm:text-blueLink font-semibold"
              >
                Show less
              </button>
            ) : (
              <button
                onClick={() => setIsOpen(true)}
                className="loadmore border-2 rounded border-lightBlue text-gray-800 text-lg p-2 px-6 sm:p-0 sm:border-0  sm:inline-block sm:text-blueLink font-semibold"
              >
                Read more
              </button>
            )}
          </div>
        </div>
      ) : (
        <div
          className="prose-lg"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
    </div>
  );
};
