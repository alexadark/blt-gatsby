import { graphql } from "gatsby";

export const placeTostayFragments = graphql`
  fragment PlaceToStayListing on WpPlaceToStay {
    id
    title
    slug
    databaseId
    uri
    categories {
      nodes {
        ...Category
      }
    }
    tags {
      nodes {
        ...Tag
      }
    }
    commonDataAttributes {
      standfirst
      continent
      country {
        name
        slug
      }
    }
    customDataAttributes: ptsDataAttr {
      city
      region
      website
      latitudeOfLocation1
      longitudeOfLocation1
      priceCheckingLinks {
        url
        hotelAffiliate
        logo {
          sourceUrl
          title
          altText
        }
      }
      starRating
      theme
      whoFor: especiallyFor
      priceGuide: pricePerNight
      setting
      standard
      accommodationType: type
      roomType
      hotelFacility: otherHotelFacilities
      roomFacility: roomFeatures
      forFamilies: roomForFamilies
      allInclusive
      selfCatering
      skiFacilities: ski
      brand
    }
    featuredImage {
      node {
        ...ListingImage
      }
    }
  }

  fragment PlaceToStayPage on WpPlaceToStay {
    id
    databaseId
    title
    uri
    seo {
      ...SeoPage
    }
    featuredImage {
      node {
        ...ListingImage
      }
    }

    modified
    commonDataAttributes {
      about
      bcklgeoDistance
      review {
        title
        content
      }
      standfirst
      continent
      country {
        name
        slug
      }
      imageGallery {
        ...LargeImage
        ...ThumbImage
      }
      sidebarTourOperator {
        ... on WpTourOperator {
          id
          title
          commonDataAttributes {
            standfirst
          }
          tourOperatorDataAttributes {
            phone
            website
          }
          featuredImage {
            node {
              ...ListingImage
            }
          }
        }
      }
      sbtouroperatordescription
    }
    customDataAttributes: ptsDataAttr {
      writer {
        ... on WpWriter {
          title
          id
          slug
          uri
        }
      }
      address
      airportTransfers
      allInclusive
      fdFeatures
      otherHotelFacilities
      parking
      pool
      beach
      priceCheckingLinks {
        url
        hotelAffiliate
        logo {
          altText
          sourceUrl
        }
      }
      region
      city
      roomFeatures
      roomForFamilies
      roomType
      selfCatering
      isSkiHotel
      ski
      starRating
      wifi
      website
      latitudeOfLocation1
      longitudeOfLocation1
      experiences {
        __typename
        ... on WpExperience {
          ...ExperienceListing
        }
      }
      destinations {
        __typename
        ... on WpDestination {
          ...DestinationListing
        }
      }
    }
  }
`;
