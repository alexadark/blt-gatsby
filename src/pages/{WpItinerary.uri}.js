import React from "react";
import { graphql } from "gatsby";

import {
  CollapseSection,
  Layout,
  SidebarSocialShare,
  SocialShare,
  TravelQuote,
} from "../components";
import PageLayout from "../components/layout/PageLayout";
import { Newsletter } from "../components/Newsletter";
import { window } from "browser-monads";
import SidebarTourOperator from "../components/sidebar/SidebarTourOperator";
import { About } from "../components/layout/About";
import { CollapseListings } from "../components/layout/CollapseListings";
import { IntroText } from "../components/layout/IntroText";
import { CollapseCards } from "../components/layout/CollapseCards";
import { useRecentlyViewed } from "../lib/hooks/useRecentlyViewed";
import clsx from "clsx";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Seo } from "@gatsbywpthemes/gatsby-plugin-wp-seo";
import { useSeoGeneral } from "../lib/hooks/useSeoGeneral";

const ItineraryPage = ({ data }) => {
  const url = window.location.href;
  const { wpItinerary: itinerary } = data || {};

  const {
    id,
    modified,
    uri,
    title,
    author,
    commonDataAttributes,
    customDataAttributes,
    featuredImage,
  } = itinerary || {};

  useRecentlyViewed({ title, featuredImage, uri, id });

  const seoGeneral = useSeoGeneral();
  const seo = {
    page: itinerary?.seo,
    general: seoGeneral?.wp?.seo,
  };
  const seoImage = featuredImage?.node?.localFile?.childImageSharp?.original;

  const { about, sidebarTourOperator, sbtouroperatordescription, review } =
    commonDataAttributes || {};
  const { days } = customDataAttributes || {};

  const breadcrumbsTerms = [
    { name: "home", link: "/" },
    { name: "Itineraries" },
  ];
  return (
    <Layout page="itinerary">
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
      <PageLayout
        title={title}
        intro="Recommended itinerary:"
        sidebar={
          <div className="space-y-base2">
            <Newsletter />
            <SidebarSocialShare url={url} />
            {sidebarTourOperator &&
              sidebarTourOperator.map((to, index) => (
                <SidebarTourOperator
                  key={index}
                  tourOperator={to}
                  description={sbtouroperatordescription}
                />
              ))}
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
            author={author.node}
            date={modified}
            socialShare={<SocialShare url={url} />}
            text="Know someone who would like this itinerary? Why not let them know…"
            about={about}
            review={review}
          />
        </section>
        {days?.map((day, index) => {
          const { about, linksExp, linksPts } = day;

          const expLinks = linksExp || [];
          const ptsLinks = linksPts || [];

          const allLinks = [...expLinks, ...ptsLinks];
          return (
            <CollapseSection key={index} title={day.title} listings>
              <IntroText content={about} />
              <div>
                <CollapseListings listings={allLinks} />
                <CollapseCards cards={allLinks} className="md:hidden" />
              </div>
            </CollapseSection>
          );
        })}
      </PageLayout>
      {/* Quote */}
      <TravelQuote author="Mark Twain">
        “Twenty years from now you will be more disappointed by the things that
        you didn’t do than by the ones you did do. So throw off the bowlines.
        Sail away from the safe harbor. Catch the trade winds in your sails.
        Explore. Dream. Discover.”
      </TravelQuote>
    </Layout>
  );
};

export default ItineraryPage;

export const pageQuery = graphql`
  query ($uri: String!) {
    wpItinerary(uri: { eq: $uri }) {
      ...ItineraryPage
    }
  }
`;
