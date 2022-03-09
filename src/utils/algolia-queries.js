const gql = require("fake-tag");

const allWpExperienceQuery = gql`
  {
    allWpExperience {
      nodes {
        id
        databaseId
        title
        uri
        date
        nodeType
        featuredImage {
          node {
            altText
            sourceUrl
            caption
            description
            # localFile {
            #   childImageSharp {
            #     gatsbyImageData(
            #       quality: 80
            #       aspectRatio: 1.5
            #       layout: CONSTRAINED
            #     )
            #     original {
            #       height
            #       width
            #       src
            #     }
            #   }
            # }
          }
        }
        commonDataAttributes {
          standfirst
          country {
            name
          }
          continent
        }
        customDataAttributes: experienceDataAttributes {
          eventType: eventSubType
          activityType: activitySubType
          attractionType: attractionSubType
          priceGuideExp: priceRange
          bestTime: bestMonthFrom1
          whenAvailable: availableMonthFrom1
          whoFor: especiallyFor
          theme
          setting
          experienceType: type
          rating: isBucketList
          city
          latitudeOfLocation1
          latitudeOfLocation2
          latitudeOfLocation3
          longitudeOfLocation1
          longitudeOfLocation2
          longitudeOfLocation3
          profile
          region
          priceFrom
          minAge
          whenIsIt
          profile
          website
          generic: isGenericRecommendation
        }
        tags {
          nodes {
            name
          }
        }
        categories {
          nodes {
            name
          }
        }
      }
    }
  }
`;
const allWpDestinationQuery = gql`
  {
    allWpDestination {
      nodes {
        customDataAttributes: destinationDataAttributes {
          latitudeOfLocation1
          longitudeOfLocation1
          region
          setting
          bestTime: bestMonthFrom1
        }
        id
        databaseId
        title
        uri
        date
        nodeType
        featuredImage {
          node {
            altText
            sourceUrl
            caption
            description
            # localFile {
            #   childImageSharp {
            #     gatsbyImageData(
            #       quality: 80
            #       aspectRatio: 1.5
            #       layout: CONSTRAINED
            #     )
            #     original {
            #       height
            #       width
            #       src
            #     }
            #   }
            # }
          }
        }
        commonDataAttributes {
          standfirst
          country {
            name
          }
          continent
        }
        tags {
          nodes {
            name
          }
        }
        categories {
          nodes {
            name
          }
        }
      }
    }
  }
`;
const allWpPlaceToStayQuery = gql`
  {
    allWpPlaceToStay {
      nodes {
        customDataAttributes: ptsDataAttr {
          city
          website
          latitudeOfLocation1
          longitudeOfLocation1
          priceCheckingLinks {
            url
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
        id
        databaseId
        title
        uri
        date
        nodeType
        featuredImage {
          node {
            altText
            sourceUrl
            caption
            description
            # localFile {
            #   childImageSharp {
            #     gatsbyImageData(
            #       quality: 80
            #       aspectRatio: 1.5
            #       layout: CONSTRAINED
            #     )
            #     original {
            #       height
            #       width
            #       src
            #     }
            #   }
            # }
          }
        }
        commonDataAttributes {
          standfirst
          country {
            name
          }
          continent
        }
        tags {
          nodes {
            name
          }
        }
        categories {
          nodes {
            name
          }
        }
      }
    }
  }
`;
const allWpRoundUpQuery = gql`
  {
    allWpRoundUp {
      nodes {
        id
        databaseId
        title
        uri
        date
        nodeType
        featuredImage {
          node {
            altText
            sourceUrl
            caption
            description
            # localFile {
            #   childImageSharp {
            #     gatsbyImageData(
            #       quality: 80
            #       aspectRatio: 1.5
            #       layout: CONSTRAINED
            #     )
            #     original {
            #       height
            #       width
            #       src
            #     }
            #   }
            # }
          }
        }
        commonDataAttributes {
          standfirst
          country {
            name
          }
          continent
        }
        tags {
          nodes {
            name
          }
        }
        categories {
          nodes {
            name
          }
        }
        customDataAttributes: roundUpDataAttributes {
          setting
          theme
          especiallyFor
          recommendationType: type
        }
      }
    }
  }
`;
const allWpItineraryQuery = gql`
  {
    allWpItinerary {
      nodes {
        customDataAttributes: itineraryDataAttributes {
          latitudeOfLocation1
          longitudeOfLocation1
          minAge
          setting
          theme
          bestTime: bestMonthFrom1
          whoFor: especiallyFor
        }
        id
        databaseId
        title
        uri
        date
        nodeType
        featuredImage {
          node {
            altText
            sourceUrl
            caption
            description
            # localFile {
            #   childImageSharp {
            #     gatsbyImageData(
            #       quality: 80
            #       aspectRatio: 1.5
            #       layout: CONSTRAINED
            #     )
            #     original {
            #       height
            #       width
            #       src
            #     }
            #   }
            # }
          }
        }
        commonDataAttributes {
          standfirst
          country {
            name
          }
          continent
        }
        tags {
          nodes {
            name
          }
        }
        categories {
          nodes {
            name
          }
        }
      }
    }
  }
`;

const queries = [
  {
    query: allWpItineraryQuery,
    transformer: ({ data }) => {
      return data.allWpItinerary.nodes.map(({ tags, categories, ...item }) => {
        return {
          ...item,
          date_timestamp: new Date(item.date).getTime(),
          tags: mergeArray(tags),
          categories: mergeArray(categories),
        };
      });
    },
    indexName: `BucketList`,
  },
  {
    query: allWpRoundUpQuery,
    transformer: ({ data }) => {
      return data.allWpRoundUp.nodes.map(({ tags, categories, ...item }) => {
        return {
          ...item,
          date_timestamp: new Date(item.date).getTime(),
          tags: mergeArray(tags),
          categories: mergeArray(categories),
        };
      });
    },
    indexName: `BucketList`,
  },
  {
    query: allWpPlaceToStayQuery,
    transformer: ({ data }) => {
      return data.allWpPlaceToStay.nodes.map(
        ({ tags, categories, ...item }) => {
          return {
            ...item,
            date_timestamp: new Date(item.date).getTime(),
            tags: mergeArray(tags),
            categories: mergeArray(categories),
          };
        }
      );
    },
    indexName: `BucketList`,
  },
  {
    query: allWpDestinationQuery,
    transformer: ({ data }) => {
      return data.allWpDestination.nodes.map(
        ({ tags, categories, ...item }) => {
          return {
            ...item,
            date_timestamp: new Date(item.date).getTime(),
            tags: mergeArray(tags),
            categories: mergeArray(categories),
          };
        }
      );
    },
    indexName: `BucketList`,
  },
  {
    query: allWpExperienceQuery,
    transformer: ({ data }) => {
      return data.allWpExperience.nodes
        .filter(({ customDataAttributes }) => {
          const isGeneric = customDataAttributes?.generic === "yes";

          if (isGeneric) {
            return false;
          }
          return true;
        })
        .map(({ tags, categories, ...item }) => {
          return {
            ...item,
            date_timestamp: new Date(item.date).getTime(),
            tags: mergeArray(tags),
            categories: mergeArray(categories),
          };
        });
    },
    indexName: `BucketList`,
  },
];
// console.log(queries);
module.exports = queries;

const mergeArray = (items) => {
  const { nodes } = items || {};
  if (nodes === undefined || nodes === null) {
    return [];
  }
  const isArray = Array.isArray(items.nodes);
  if (!isArray) return [];
  if (items.nodes.length) {
    return items.nodes.map((item) => item.name);
  }
  return [];
};
