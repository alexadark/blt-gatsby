import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Underline } from "../ui-components";

export default function LatestRoundups() {
  const data = useStaticQuery(graphql`
    query AllRoundups {
      allWpRoundUp(limit: 4) {
        nodes {
          id
          uri
          title
          featuredImage {
            node {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(placeholder: BLURRED)
                }
                publicURL
              }
            }
          }
        }
      }
    }
  `);
  let allRoundups = data.allWpRoundUp.nodes;

  return (
    <div className="container px-5 py-6 mt-5 bg-white md:pt-4 md:pb-10 max-w-big">
      <div className="flex flex-col items-center mb-5">
        <h2 className="text-center text-f-40 md:text-[48px] text-grey5 font-light mb-5">
          Latest roundups
        </h2>
        <Underline />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {allRoundups &&
          allRoundups.map(({ title, id, uri, featuredImage }) => {
            const image = getImage(featuredImage.node.localFile);
            const altText = featuredImage.node.altText;
            return (
              <div key={id} className="px-base py-base2 group">
                <Link
                  to={uri || "#"}
                  className="hover:no-underline"
                  css={{
                    "&:hover": { h3: { textDecoration: "none !important" } },
                  }}
                >
                  <div className="cursor-pointer shadow-listing">
                    <div className="aspect-w-6 aspect-h-4 max-h-[127px] group">
                      <GatsbyImage image={image} alt={altText} />
                    </div>
                    <div className="py-4 text-center px-base group h-[100px]">
                      <h3
                        className="text-[20px] font-medium text-grey5 line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: title }}
                      />
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
      <div className="flex items-center justify-center mt-5 lg:mt-10">
        <Link
          to="/search/?q=&tab=RoundUp"
          className="hover:no-underline bg-lightBlue text-grey5 px-8 py-3 uppercase font-bold"
        >
          See all Roundups
        </Link>
      </div>
    </div>
  );
}
