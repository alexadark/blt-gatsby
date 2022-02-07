import React from "react";
import clsx from "clsx";
import { useStaticQuery, graphql } from "gatsby";
import { Image } from "./images";
import { FaEnvelope } from "react-icons/fa";
import {
  Input,
  Checkbox,
  Section,
  Typo,
  Button,
  Underline,
} from "./ui-components";
import { useMediaQuery } from "../lib/hooks";

const GET_NL_IMAGE = graphql`
  query {
    wp {
      options {
        newsletterImage {
          nlImage {
            ...NlImage
          }
        }
      }
    }
  }
`;

const EnvelopeInput = ({
  placeholder,
  height = "h-[45px]",
  enveloppeTop = "top-4",
  className,
}) => {
  return (
    <div className="relative">
      <FaEnvelope
        className={`absolute left-4 w-4 text-grey3 ${enveloppeTop}`}
      />
      <Input
        type="email"
        name="EMAIL"
        id="mce-EMAIL"
        required={true}
        placeholder={placeholder}
        className={clsx(
          " pl-12 !placeholder-grey3 focus:!placeholder-transparent text-text",
          "focus:outline-none focus:ring-transparent focus:border-grey3",
          height,
          className
        )}
      />
    </div>
  );
};

const EbookCheckboxes = ({ homeNl }) => {
  return (
    <>
      <Checkbox
        type="checkbox"
        value="1"
        name="group[183162][1]"
        id="mce-group[183162]-183162-0"
        label="Newsletter"
        className="mb-8"
        large
        homeNl={homeNl}
      />
      <Checkbox
        type="checkbox"
        value="2"
        name="group[183162][2]"
        id="mce-group[183162]-183162-1"
        label="An email every 6m reminding you we're here"
        className="mb-8"
        large
        homeNl={homeNl}
      />
      <Checkbox
        type="checkbox"
        value="4"
        name="group[183162][4]"
        id="mce-group[183162]-183162-2"
        label="Free eBook of world's Top 250 bucket list travel experiences"
        className="mb-8"
        large
        homeNl={homeNl}
      />
    </>
  );
};

const Newsletter = ({ home, ...props }) => {
  const isLarge = useMediaQuery("(min-width: 1024px)");
  const data = useStaticQuery(GET_NL_IMAGE);
  const { nlImage: image } = data?.wp?.options?.newsletterImage;
  return (
    <Section {...props}>
      <div className={`px-3 pt-3`}>
        {image && (
          <Image
            img={image?.localFile}
            loading={isLarge ? "eager" : "lazy"}
            // imgClassName={`${
            //   isLarge ? "w-[991px] h-[658px]" : "w-[292px] h-[195px]"
            // }`}
          />
        )}
      </div>
      <div className="px-5 pb-5 mt-3">
        <Typo
          as="h3"
          className={clsx("text-center", {
            "!text-f-40 leading-none !font-light !text-grey4": home,
          })}
        >
          Want one of these?
        </Typo>
        <Underline mb="mb-base2" />
        <form>
          <EbookCheckboxes />

          <EnvelopeInput
            height="h-[45px]"
            enveloppeTop="top-4"
            placeholder="Enter your email here"
          />
          <Button
            as="input"
            type="submit"
            value="submit"
            className="my-5 w-full h-50px"
          />
        </form>
        <div className="text-sm text-center text-grey3">
          We promise you won’t get any marketing from us other than what you
          specify above
        </div>
      </div>
    </Section>
  );
};

const NewsletterHome = ({ className, ...props }) => {
  const data = useStaticQuery(GET_NL_IMAGE);
  const { nlImage: image } = data?.wp?.options?.newsletterImage;
  return (
    <>
      <div
        className={clsx(
          "container max-w-big",
          "bg-white border border-grey2 shadow-section",
          "px-16 py-12",
          "hidden lg:flex",
          className
        )}
        {...props}
      >
        <div className="max-w-[566px]">
          {image && (
            <Image
              img={image?.localFile}
              className="mr-14 max-w-[556px]"
              imgClassName="max-w-[566px]"
            />
          )}
        </div>

        <div id="mc_embed_signup">
          <div className="inline-block">
            <h3 className="font-light sm:text-[48px] inline-block text-grey5 leading-none">
              Want one of these?
            </h3>
            <Underline mb="mb-base2" />
          </div>
          <form
            action="https://bucketlisttravels.us20.list-manage.com/subscribe/post?u=41a2fd602212b6bd36c51b724&amp;id=b59df86e24"
            method="post"
            id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
            className="validate"
            target="_blank"
            novalidate
          >
            <EbookCheckboxes homeNl />
            <div className="relative">
              <EnvelopeInput
                grey
                height="h-[58px]"
                enveloppeTop="top-[21px]"
                placeholder="Enter your email here"
                className="text-[20px]"
              />
              <div className="h">
                <div id="mce-responses" className="clear">
                  <div
                    className="response"
                    id="mce-error-response"
                    style={{ display: "none" }}
                  ></div>
                  <div
                    className="response"
                    id="mce-success-response"
                    style={{ display: "none" }}
                  ></div>
                </div>
                <div
                  style={{ position: "absolute", left: "-5000px" }}
                  aria-hidden="true"
                >
                  <input
                    type="text"
                    name="b_41a2fd602212b6bd36c51b724_b59df86e24"
                    tabindex="-1"
                    value=""
                  />
                </div>
              </div>
              <Button
                as="input"
                type="submit"
                value="submit"
                id="mc-embedded-subscribe"
                className={clsx("absolute top-0 right-0", "h-full w-[131px]")}
              />
            </div>
          </form>
          <div className="mt-4 text-center text-grey3">
            We promise you won’t get any marketing from us other than what you
            specify above
          </div>
        </div>
      </div>

      <Newsletter home className="lg:hidden" />
    </>
  );
};

const NewsletterSmall = () => {
  return (
    <div className="text-[20px] leading-normal">
      Get a monthly fix of inspiring ideas & exclusive offers:
      <form className="mt-5">
        <EnvelopeInput
          placeholder="Enter your email here"
          enveloppeTop="top-3"
        />
        <div className="flex justify-end">
          <Button
            as="input"
            type="submit"
            value="Sign up"
            className="h-[45px] mt-6"
          />
        </div>
      </form>
    </div>
  );
};

export { Newsletter, NewsletterSmall, EnvelopeInput, NewsletterHome };
