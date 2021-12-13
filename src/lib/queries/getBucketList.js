import { gql } from "@apollo/client";

export const GET_BUCKET_LIST = gql`
  query ($author: Int) {
    bucketLists(where: { author: $author }) {
      nodes {
        databaseId
        id
        title
        bucketListElements {
          blLinks {
            ... on Experience {
              title
              uri
              slug
              id
              databaseId
              date
              modified
              featuredImage {
                node {
                  sourceUrl
                  altText
                }
              }

              commonDataAttributes {
                standfirst
                country {
                  name
                  slug
                }
              }
              experienceTypes {
                nodes {
                  slug
                }
              }
              customDataAttributes: experienceDataAttributes {
                address
                city
                duration
                minAge

                isBucketList
                profile
                priceFrom
                region
                type
                website
              }
            }
            ... on PlaceToStay {
              id
              title
              slug
              databaseId
              uri

              commonDataAttributes {
                standfirst
                country {
                  name
                  slug
                }
              }
              customDataAttributes: ptsDataAttr {
                website
                starRating
                region
                city

                priceCheckingLinks {
                  url
                  logo {
                    altText
                    sourceUrl
                  }
                }
              }
              featuredImage {
                node {
                  sourceUrl
                  altText
                }
              }
            }
            ... on Destination {
              title
              uri
              slug
              id
              databaseId

              featuredImage {
                node {
                  sourceUrl
                  altText
                }
              }

              commonDataAttributes {
                standfirst
                country {
                  name
                  slug
                }
              }
            }
          }
        }
      }
    }
  }
`;
