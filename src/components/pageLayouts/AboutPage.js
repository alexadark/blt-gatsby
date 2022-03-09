import React from "react";
import { CollapseSection, Typo } from "../ui-components";
import { Image } from "../images";

export const AboutPage = ({ aboutPageContent }) => {
  const { ourDifference, ourStory, ourGoals, ourWriters, aboutImage } =
    aboutPageContent;
  return (
    <>
      {ourStory && (
        <CollapseSection title="Our story">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: ourStory }}
              />
              <div className="mt-10 text-right font-script text-gold text-f-40">
                Matt
              </div>
            </div>
            <div className="space-y-12">
              <div className="flex justify-center">
                <Image
                  // img={aboutImage?.localFile}
                  fullObj={aboutImage}
                  alt={aboutImage?.altText}
                  objectFit="cover"
                  objectPosition="center"
                  loading="eager"
                />
              </div>
              {ourGoals && (
                <div className=" bg-blue1 px-base2 py-base">
                  <Typo as="h3" h3 className="mb-3">
                    Our goals
                  </Typo>
                  <div
                    dangerouslySetInnerHTML={{ __html: ourGoals }}
                    className="leading-snug prose max-w-none"
                  />
                </div>
              )}
            </div>
          </div>
        </CollapseSection>
      )}
      {ourDifference && (
        <CollapseSection title="Our difference">
          <div
            dangerouslySetInnerHTML={{ __html: ourDifference }}
            className="prose max-w-none"
          />
        </CollapseSection>
      )}
      {ourWriters && (
        <CollapseSection title="Our writers">
          <div
            dangerouslySetInnerHTML={{ __html: ourWriters }}
            className="prose max-w-none"
          />
        </CollapseSection>
      )}
    </>
  );
};
