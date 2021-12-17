import React, { useState } from "react";
import { graphql } from "gatsby";
import { window } from "browser-monads";
import { useDdestinationsArray } from "../lib/hooks/useDestinationsArray";

import {
  CollapseSection,
  Layout,
  SidebarSocialShare,
  SocialShare,
  TravelQuote,
} from "../components";
import { Newsletter } from "../components/Newsletter";
import {
  HotelFeatures,
  FeatureRow,
  Feature,
} from "../components/layout/HotelFeatures";
import { About } from "../components/layout/About";
import { Seo } from "@gatsbywpthemes/gatsby-plugin-wp-seo";
import { useSeoGeneral } from "../lib/hooks/useSeoGeneral";

import { CollapseListings } from "../components/layout/CollapseListings";
import PageLayout from "../components/layout/PageLayout";
import { Price } from "../components/Price";
import SidebarTourOperator from "../components/sidebar/SidebarTourOperator";
import { useRecentlyViewed } from "../lib/hooks/useRecentlyViewed";
import { CollapseCards } from "../components/layout/CollapseCards";
import { Breadcrumbs } from "../components/Breadcrumbs";
import slugify from "slugify";
import DetailPageMap from "./../components/maps/DetailPageMap";

const slugs = (string) => slugify(string, { lower: true, strict: true });

const PlaceToStayPage = ({ data }) => {
  const url = window.location.href;
  const { wpPlaceToStay: pts } = data || {};

  const {
    title,
    modified,
    commonDataAttributes,
    customDataAttributes,
    featuredImage,
    uri,
    databaseId,
  } = pts || {};

  useRecentlyViewed({ title, featuredImage, uri });

  const seoGeneral = useSeoGeneral();
  const seo = {
    page: pts?.seo,
    general: seoGeneral?.wp?.seo,
  };
  const seoImage = featuredImage?.node.localFile.childImageSharp.original;

  const {
    imageGallery,
    about,
    sidebarTourOperator,
    sbtouroperatordescription,
    review,
    continent,
    country,
    bcklgeoDistance,
  } = commonDataAttributes || {};

  console.log("distance", JSON.parse(bcklgeoDistance));

  const {
    writer,
    priceCheckingLinks,
    airportTransfers,
    beach,
    roomFeatures,
    roomType,
    roomForFamilies,
    fdFeatures,
    allInclusive,
    selfCatering,
    otherHotelFacilities,
    pool,
    parking,
    region,
    wifi,
    starRating,
    ski,
    isSkiHotel,
    experiences,
    destinations,
    city,
    website,
  } = customDataAttributes || {};

  const hf = otherHotelFacilities?.map((item) => item.toLowerCase());
  const poolFeatures = pool?.map((item) => item.toLowerCase());
  const fd = fdFeatures?.map((item) => item.toLowerCase());

  const bucketListExperiences = experiences?.filter(
    (exp) => exp.customDataAttributes.isBucketList === "yes"
  );
  const otherExperiences = experiences
    ?.filter((exp) => exp.customDataAttributes.isBucketList === "no")
    .filter(
      (exp) => exp.customDataAttributes.isGenericRecommmendation === "no"
    );

  const tabs = [
    { name: "our review" },
    { name: "price" },
    { name: "amenities" },
    { name: "experiences nearby" },
    { name: "map" },
  ];
  const destinationsArray = useDdestinationsArray();

  const brContinent = continent?.length === 1 ? continent[0] : null;
  const breadcrumbsTerms = [
    { name: "home", link: "/" },
    { name: brContinent, link: `/search/?q=${brContinent}` },
    { name: country.name, link: `/search/?q=${country.name}` },
    {
      name: region,
      link: destinationsArray.includes(region?.toLowerCase())
        ? `/destination/${region && slugs(region)}`
        : `/search/?q=${region}`,
    },
    {
      name: city,
      link: destinationsArray.includes(city?.toLowerCase())
        ? `/destination/${city && slugs(city)}`
        : `/search/?q=${city}`,
    },
  ].filter((term) => term.name);
  const [isMapOpen, setIsMapOpen] = useState(false);

  return (
    <Layout page="place-to-stay">
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
        pageType="placetostay"
        data={pts}
      />
      <PageLayout
        title={title}
        stars={parseInt(starRating)}
        intro="Recommended place to stay:"
        tabs={tabs}
        mapOpen={() => setIsMapOpen(true)}
        images={imageGallery}
        bl
        item={pts}
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
        {/* Review */}
        <CollapseSection title="Our review" id="our-review">
          <About
            writer={writer && writer[0]}
            socialShare={<SocialShare url={url} />}
            date={modified}
            about={about}
            review={review}
            text="Know someone who would like this place to stay? Why not let them know…"
          />
        </CollapseSection>

        {/* Price */}
        {priceCheckingLinks && (
          <CollapseSection title="Price" id="price">
            <Price priceCheckingLinks={priceCheckingLinks} website={website} />
          </CollapseSection>
        )}
        {/* {priceCheckingLinks || website && (
          <CollapseSection title="Price" id="price">
            <Price priceCheckingLinks={priceCheckingLinks} website={website} />
          </CollapseSection>
        )} */}

        {/* General Amenities */}
        <CollapseSection title="General amenities" id="amenities">
          {/* Key facilities */}
          <HotelFeatures title="Key facilities">
            <FeatureRow>
              <Feature>
                Airport transfers
                {airportTransfers === "Additional charge" ? (
                  <span className="text-2xl ">*</span>
                ) : (
                  ": " + airportTransfers
                )}{" "}
              </Feature>
              <Feature>Beach: {beach} </Feature>

              <Feature disabled={!hf?.includes("creche")}>Creche</Feature>
              <Feature disabled={!hf?.includes("fitness center")}>
                Fitness centre
              </Feature>
            </FeatureRow>

            <FeatureRow>
              <Feature disabled={!hf?.includes("fitness classes")}>
                Fitness classes
              </Feature>
              <Feature disabled={!hf?.includes("golf course")}>
                Golf course
              </Feature>
              <Feature disabled={!hf?.includes("hot tub")}>Hot tub</Feature>
              <Feature>
                Parking
                {parking === "Additional charge" ? (
                  <span className="text-2xl ">*</span>
                ) : parking.includes("(charge)") ? (
                  <div className="inline">
                    : {parking.replace("(charge)", "")}
                    <span className="text-2xl font-bold">*</span>
                  </div>
                ) : (
                  ": " + parking
                )}
              </Feature>
            </FeatureRow>

            <FeatureRow>
              <Feature disabled={!poolFeatures?.includes("adults only")}>
                Pool (adults only)
              </Feature>
              <Feature disabled={!poolFeatures?.includes("indoor")}>
                Pool (indoor)
              </Feature>
              <Feature disabled={!poolFeatures?.includes("outdoor")}>
                Pool (outdoor)
              </Feature>
              <Feature disabled={!poolFeatures?.includes("kids")}>
                Pool (kids)
              </Feature>
            </FeatureRow>

            <FeatureRow>
              <Feature disabled={!hf?.includes("spa")}>Spa</Feature>
              <Feature disabled={!hf?.includes("tennis courts")}>
                Tennis courts
              </Feature>
              <Feature>
                WiFi
                {wifi === "Additional charge" ? (
                  <span className="text-2xl">*</span>
                ) : (
                  ": " + wifi
                )}
              </Feature>
              <Feature disabled={!hf?.includes("yoga")}>Yoga</Feature>
            </FeatureRow>
          </HotelFeatures>

          {/* Food and drinks */}
          <HotelFeatures title="Food & drink">
            <FeatureRow>
              <Feature
                disabled={allInclusive === "Not available"}
                optional={allInclusive === "Optional"}
              >
                All inclusive
              </Feature>
              <Feature disabled={!fd?.includes("kids menu")}>Kids menu</Feature>
              <Feature disabled={!fd?.includes("restaurant on-site")}>
                Restaurant on-site
              </Feature>
              <Feature
                disabled={selfCatering === "Not available"}
                optional={selfCatering === "Optional"}
              >
                Self catering
              </Feature>
            </FeatureRow>
          </HotelFeatures>
          {isSkiHotel && (
            <HotelFeatures title="Ski facilities">
              <FeatureRow>
                <Feature disabled={!ski?.includes("Ski in ski out")}>
                  Ski in ski out
                </Feature>
                <Feature disabled={!ski?.includes("Shuttle to slopes")}>
                  Shuttle to slopes
                </Feature>
                <Feature disabled={!ski?.includes("Ski rentals onsite")}>
                  Ski rentals onsite
                </Feature>
              </FeatureRow>
            </HotelFeatures>
          )}
          <div className="">
            <div className="inline-block mr-2 text-2xl">*</div>
            Additional charge
          </div>
        </CollapseSection>

        {/* Room amenities */}
        <CollapseSection title="Room amenities">
          <HotelFeatures title="Room types">
            <FeatureRow>
              <Feature disabled={!roomType?.includes("Apartments")}>
                Apartments
              </Feature>
              <Feature disabled={!roomType?.includes("Bedrooms")}>
                Bedrooms
              </Feature>
              <Feature disabled={!roomType?.includes("Cabins")}>Cabins</Feature>
              <Feature disabled={!roomType?.includes("Suites")}>Suites</Feature>
            </FeatureRow>
            <FeatureRow>
              <Feature disabled={!roomType?.includes("Tents")}>Tents</Feature>
              <Feature disabled={!roomType?.includes("Villas")}>Villas</Feature>
              <Feature disabled={!roomType?.includes("Yurts")}>Yurts</Feature>
            </FeatureRow>
          </HotelFeatures>

          <HotelFeatures title="Room facilities">
            <FeatureRow>
              <Feature disabled={!roomFeatures?.includes("Air conditioning")}>
                Air conditioning
              </Feature>
              <Feature disabled={!roomFeatures?.includes("Flat screen TV")}>
                Flat screen TV
              </Feature>
              <Feature disabled={!roomFeatures?.includes("Jacuzzi")}>
                Jacuzzi (private)
              </Feature>
              <Feature disabled={!roomFeatures?.includes("Pool (private")}>
                Pool (private)
              </Feature>
            </FeatureRow>
            <FeatureRow>
              <Feature
                disabled={
                  !roomFeatures?.includes("Tea & coffee making facilities")
                }
              >
                Tea & coffee making facilities
              </Feature>
              <Feature disabled={!roomFeatures?.includes("WiFi")}>WiFi</Feature>
            </FeatureRow>
          </HotelFeatures>

          <HotelFeatures title="Family sleeping">
            <FeatureRow>
              <Feature
                disabled={!roomForFamilies?.includes("Connecting rooms")}
              >
                Connecting rooms
              </Feature>

              <Feature disabled={!roomForFamilies?.includes("Family rooms")}>
                Family rooms
              </Feature>
              <Feature disabled={!roomForFamilies?.includes("Rollaway beds")}>
                Rollaway beds
              </Feature>
              <Feature
                disabled={!roomForFamilies?.includes("Sectionable suites")}
              >
                Sectionable suites
              </Feature>
            </FeatureRow>
          </HotelFeatures>
        </CollapseSection>
        {/* Bucketlist experiences */}
        {bucketListExperiences && bucketListExperiences?.length > 0 && (
          <CollapseSection
            title="Bucket list experiences nearby"
            number={bucketListExperiences.length}
            listings
          >
            <div className="mt-5">
              <CollapseListings
                listings={bucketListExperiences}
                databaseId={databaseId}
                distance={bcklgeoDistance}
              />
              <CollapseCards
                cards={bucketListExperiences}
                className="md:hidden"
              />
            </div>
          </CollapseSection>
        )}
        {/* Other experiences */}
        {otherExperiences && otherExperiences?.length > 0 && (
          <CollapseSection
            title="Other experiences nearby"
            number={otherExperiences.length}
            listings
          >
            <CollapseListings
              listings={otherExperiences}
              distance={bcklgeoDistance}
            />
            <CollapseCards cards={otherExperiences} className="md:hidden" />
          </CollapseSection>
        )}
        {/* Destination guide */}
        {destinations && (
          <CollapseSection
            title="Destination guides"
            number={destinations.length}
            listings
          >
            <CollapseListings
              listings={destinations}
              distance={bcklgeoDistance}
            />
            <CollapseCards cards={destinations} className="md:hidden" />
          </CollapseSection>
        )}
      </PageLayout>

      {/* Quote */}
      <TravelQuote author="Michael Palin">
        “Once the travel bug bites there is no known antidote, and I know that I
        shall be happily infected until the end of my life”
      </TravelQuote>
    </Layout>
  );
};

export default PlaceToStayPage;

export const pageQuery = graphql`
  query ($uri: String!) {
    wpPlaceToStay(uri: { eq: $uri }) {
      ...PlaceToStayPage
    }
  }
`;
