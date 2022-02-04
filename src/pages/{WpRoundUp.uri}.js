import React, { useState, useEffect } from "react";
import { Layout, Section, SocialShare, TravelQuote } from "../components";
import PageLayout from "../components/layout/PageLayout";
import clsx from "clsx";
import { window } from "browser-monads";
import { About } from "../components/layout/About";
import { CardsGrid } from "../components/layout/CardsGrid";
import { Listing } from "../components/layout/Listing";
import { ListingCard } from "../components/layout/ListingCard";
import ViewSwitcher from "../components/my-components/ViewSwitcher";
import { graphql } from "gatsby";
import { Breadcrumbs } from "../components/Breadcrumbs";
import PlaceToStayFilter from "../components/my-components/PlaceToStayFilter";
import ExperiencesFilter from "../components/my-components/ExperiencesFilter";
import useStore from "./../store";
import filters from "../utils/FiltersData";
import { useSeoGeneral } from "../lib/hooks/useSeoGeneral";
import { Seo } from "@gatsbywpthemes/gatsby-plugin-wp-seo";
import DetailPageMap from "./../components/maps/DetailPageMap";
import { useRecentlyViewed } from "../lib/hooks/useRecentlyViewed";

const RoundupPage = ({ data }) => {
  console.log("data", data);
  const { wpRoundUp: roundUp } = data || {};
  const contentType = roundUp.customDataAttributes.type;
  const [view, setView] = useState("list");
  const seoGeneral = useSeoGeneral();

  const seo = {
    page: roundUp?.seo,
    general: seoGeneral?.wp?.seo,
  };

  useEffect(() => {
    const isLarge = window.matchMedia("(min-width: 768px)").matches;
    isLarge ? setView("list") : setView("grid");
  }, []);

  const url = window.location.href;

  const {
    id,
    title,
    commonDataAttributes,
    customDataAttributes,
    modified,
    author,
    featuredImage,
    uri,
  } = roundUp || {};
  useRecentlyViewed({ title, featuredImage, uri, id });

  const { about } = commonDataAttributes || {};
  const { links } = customDataAttributes || {};
  const breadcrumbsTerms = [{ name: "home", link: "/" }, { name: "Round-ups" }];
  const [openFilters, setOpenFilters] = useState(false);
  const [filteredLinks, setFilteredLinks] = useState(links);
  const updateItemExist = useStore((state) => state.updateItemExist);
  const allFilters = useStore((state) => state.allFilters);

  useEffect(() => {
    let resArr = links;
    const allFiltersArray = Object.keys(allFilters);
    if (!allFiltersArray.length) return;
    allFiltersArray.forEach((filterItem) => {
      const filterArray = allFilters[filterItem];
      if (!filterArray.length) return;
      resArr = resArr.filter((item) => {
        const dataItem =
          filterItem === "continent"
            ? item.link[0].commonDataAttributes[filterItem]
            : item.link[0].customDataAttributes[filterItem];

        if (!dataItem) return false;
        const haveItem = Array.isArray(dataItem)
          ? dataItem?.some(
              (item) =>
                filterArray
                  .map((i) => i?.toUpperCase() ?? i)
                  ?.includes(item.toUpperCase()) ?? true
            ) ?? false
          : filterArray
              .map((i) => i?.toUpperCase() ?? i)
              ?.includes(dataItem.toUpperCase()) ?? true;
        if (haveItem) {
          return true;
        }
        return false;
      });
    });
    setFilteredLinks([...new Set(resArr)]);
  }, [allFilters, links]);

  useEffect(() => {
    const allFiltersArray = Object.keys(filters);
    let existingItems = allFiltersArray.reduce(function (allItems, item) {
      if (item === "continent") {
        allItems[item] = [
          ...new Set(
            links.map(({ link }) => link[0].commonDataAttributes[item]).flat()
          ),
        ];
      } else {
        allItems[item] = [
          ...new Set(
            links.map(({ link }) => link[0].customDataAttributes[item]).flat()
          ),
        ];
      }
      return allItems;
    }, {});
    updateItemExist(existingItems);
  }, []);

  const seoImage = featuredImage?.node?.localFile?.childImageSharp?.original;
  const [isMapOpen, setIsMapOpen] = useState(false);

  return (
    <Layout page="round-up">
      <Seo
        title={title}
        uri={uri}
        yoastSeo={true}
        seo={seo}
        featuredImage={
          seoImage && {
            src: seoImage.src,
            width: seoImage.width,
            height: seoImage.height,
          }
        }
      />
      <Breadcrumbs terms={breadcrumbsTerms} />
      <DetailPageMap
        isMapOpen={isMapOpen}
        closeModal={() => setIsMapOpen(false)}
        pageType="roundup"
        data={roundUp}
      />
      <PageLayout
        title={title}
        smallMargin
        intro="Our round-ups of the best of the best: "
        isFilters
        openFilters={openFilters}
        setOpenFilters={setOpenFilters}
        sidebar={
          <div>
            {contentType === "Places to stay" && (
              <PlaceToStayFilter
                openFilters={openFilters}
                setOpenFilters={setOpenFilters}
              />
            )}
            {contentType === "Experiences" && (
              <ExperiencesFilter
                openFilters={openFilters}
                setOpenFilters={setOpenFilters}
              />
            )}
          </div>
        }
      >
        <section
          className={clsx(
            "py-5 sm:py-8 my-3 sm:my-base2 px-4 sm:px-7",
            "bg-white border shadow-section border-grey2"
          )}
        >
          <About
            text="Know someone who would like this round-up? Why not let them know…"
            about={about}
            author={author?.node}
            date={modified}
            socialShare={<SocialShare url={url} />}
          />
        </section>
        <div className="justify-end hidden mb-base2 md:flex">
          <ViewSwitcher
            isClickable={true}
            mapOpen={() => setIsMapOpen(true)}
            setView={setView}
          />
        </div>
        {view === "list" && (
          <Section className={clsx("p-5 md:p-8  mb-base2")}>
            {filteredLinks?.map((item, i) => {
              const type = item.link[0].__typename;

              return (
                <>
                  <div key={item.link[0].id}>
                    <Listing
                      item={item}
                      key={item.link[0].id}
                      pts={type === "PlaceToStay"}
                      itinerary={type === "Itinerary"}
                      className="hidden md:block"
                    />
                    <div className="flex justify-center">
                      <ListingCard
                        item={item}
                        key={item.link[0].id}
                        pts={type === "PlaceToStay"}
                        itinerary={type === "Itinerary"}
                        className="mb-10 md:hidden"
                      />
                    </div>
                  </div>
                </>
              );
            })}
          </Section>
        )}
        {view === "grid" && (
          <CardsGrid cards={filteredLinks} className="mb-base2" />
        )}
        {view === "map" && "map view here"}
      </PageLayout>
      {/* Quote */}
      <TravelQuote author="Daranna Gidel">
        “You lose sight of things… and when you travel, everything balances
        out.”
      </TravelQuote>
    </Layout>
  );
};
export default RoundupPage;

export const pageQuery = graphql`
  query ($uri: String!) {
    wpRoundUp(uri: { eq: $uri }) {
      ...RoundUpPage
    }
  }
`;
