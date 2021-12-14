import React from "react";
import { Link } from "gatsby";

export const Breadcrumbs = ({ terms = [] }) => {
  return (
    <div className="container flex flex-wrap px-5 pt-3 text-sm sm:text-base max-w-big 2xl:px-0">
      {terms?.map((term, index) => {
        const { name, link } = term || {};

        return (
          <div key={index} className="uppercase leading-relaxed">
            {link ? <Link to={link}>{name}</Link> : `${name}`}
            {index !== terms?.length - 1 && (
              <span className="inline-block mx-2 sm:mx-3 ">{`>`}</span>
            )}
          </div>
        );
      })}
    </div>
  );
};
