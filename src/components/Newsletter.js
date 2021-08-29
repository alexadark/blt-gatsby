import React from "react"
import clsx from "clsx"
import { StaticImage } from "gatsby-plugin-image"

import { FaEnvelope } from "react-icons/fa"
import { Input, Checkbox, Section, Typo, Button } from "."
import { useMediaQuery } from "../lib/hooks"

const EnvelopeInput = ({
  placeholder,
  height = "h-[45px]",
  enveloppeTop = "top-4",
  className,
}) => {
  return (
    <div className="relative">
      <FaEnvelope
        className={`absolute w-4 text-grey3 ${enveloppeTop} left-4`}
      />
      <Input
        type="email"
        name="email"
        placeholder={placeholder}
        className={clsx(
          " pl-12 !placeholder-grey3 focus:!placeholder-transparent",
          "focus:outline-none focus:ring-transparent focus:border-grey3",
          height,
          className
        )}
      />
    </div>
  )
}

const EbookCheckboxes = ({ homeNl }) => {
  return (
    <>
      <Checkbox
        id="ebook"
        label="Our e-book of the top 200 must-do travel experiences"
        className="mb-8"
        large
        homeNl={homeNl}
      />
      <Checkbox
        id="round-up"
        label="A monthly round up of exclusive offers, ideas & inspiration"
        className="mb-8"
        large
        homeNl={homeNl}
      />
      <Checkbox
        id="reminder"
        label="A reminder every 6 months that we're here"
        className="mb-8"
        large
        homeNl={homeNl}
      />
    </>
  )
}

const EbookImage = ({ ...props }) => (
  <img
    src="/images/newsletter-image.png"
    // objectFit="cover"
    // objectPosition="center"
    alt="newsletter image"
    {...props}
  />
  //   TODO: fix image
)
const Newsletter = ({ home }) => {
  const isLarge = useMediaQuery("(min-width: 1024px)")
  return (
    <Section className={clsx("")}>
      <div className="px-3 pt-3">
        <EbookImage
          width={isLarge ? 292 : 1024}
          height={isLarge ? 195 : 638}
          priority={isLarge}
        />
      </div>
      <div className="px-5 pb-5 mt-3">
        <Typo
          as="h3"
          className={clsx("text-center ", {
            "!text-f-40 leading-none !font-light !text-grey4": home,
          })}
        >
          Want one of these?
        </Typo>
        <div className="flex justify-center mt-3 mb-base2">
          <img
            src="/images/underline.svg"
            width={111}
            height={8}
            layout="fixed"
            loading="eager"
            alt="underline"
          />
        </div>
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
            className="w-full my-5 h-50px"
          />
        </form>
        <div className="text-sm text-center text-grey3">
          We promise you won’t get any marketing from us other than what you
          specify above
        </div>
      </div>
    </Section>
  )
}

const NewsletterHome = ({ className, ...props }) => {
  const isLarge = useMediaQuery("(min-width: 1024px)")
  return (
    <>
      {isLarge ? (
        <div
          className={clsx(
            "container max-w-big",
            "border border-grey2 shadow-section bg-white",
            "px-16 py-12",
            "lg:flex",
            className
          )}
          {...props}
        >
          <EbookImage
            width={566}
            height={371}
            className="mr-14 max-w-[556px]"
          />
          <div>
            <div className="inline-block">
              <h3 className="font-light sm:text-[48px] inline-block text-grey5 leading-none">
                Want one of these?
              </h3>
              <div className="flex justify-center mt-3 mb-base2">
                <img
                  src="/images/underline.svg"
                  width={111}
                  height={8}
                  layout="fixed"
                  loading="eager"
                  alt="underline"
                />
              </div>
            </div>
            <form>
              <EbookCheckboxes homeNl />
              <div className="relative">
                <EnvelopeInput
                  grey
                  height="h-[58px]"
                  enveloppeTop="top-[21px]"
                  placeholder="Enter your email here"
                  className="text-[20px]"
                />
                <Button
                  as="input"
                  type="submit"
                  value="submit"
                  className={clsx("absolute top-0 right-0", "w-[131px] h-full")}
                />
              </div>
            </form>
            <div className="mt-4 text-center text-grey3">
              We promise you won’t get any marketing from us other than what you
              specify above
            </div>
          </div>
        </div>
      ) : (
        <Newsletter home />
      )}
    </>
  )
}

const NewsletterSmall = () => {
  return (
    <div className="text-[20px]">
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
  )
}

export { Newsletter, NewsletterSmall, EnvelopeInput, NewsletterHome }