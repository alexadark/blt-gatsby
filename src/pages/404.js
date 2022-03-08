import React from "react";
import { Layout, TravelQuote } from "../components";
import { useStaticQuery, graphql } from "gatsby";
import { Seo } from "@gatsbywpthemes/gatsby-plugin-wp-seo";
import { Image } from "../components/images";
import clsx from "clsx";
import { Home404Search } from "../components/search";

const NOT_FOUND_QUERY = graphql`
  query {
    wp {
      options {
        specialPagesImages {
          notFoundImage {
            ...FullImage
          }
        }
      }
    }
  }
`;

const NotFoundPage = () => {
  const data = useStaticQuery(NOT_FOUND_QUERY);
  const { notFoundImage: image } = data?.wp?.options?.specialPagesImages;
  return (
    <Layout location="page" page="404">
      <Seo title="404: Not found" />
      <div className={clsx(" relative mb-base2")}>
        {/* <div className="z-0"> */}
        <Image
          img={image?.localFile}
          fullObj={image}
          alt={image?.altText}
          loading="eager"
          objectFit="cover"
          objectPosition="center"
          className="h-[295px] sm:h-[600px] w-full"
        />
        {/* </div> */}
        <div
          className={clsx(
            "absolute left-0 sm:top-[150px] top-14 z-20 w-full h-[220px] sm:h-[400px] text-center",
            "flex flex-col justify-between"
          )}
        >
          <h1
            className={clsx(
              "sm:text-[70px] text-[20px] font-bold leading-tight text-white text-center z-20"
            )}
          >
            Sorry - that page cannot be found!
          </h1>
          <div className="container px-4">
            <h2 className="text-white mb-3 sm:mb-9 sm:text-[36px] font-semibold">
              Try searching for something else:
            </h2>
            <Home404Search />
          </div>
        </div>
      </div>
      {/* Quote */}
      <TravelQuote author="Saint Augustine">
        “The world is a book, and those who do not travel read only a page”
      </TravelQuote>
    </Layout>
  );
};
export default NotFoundPage;
