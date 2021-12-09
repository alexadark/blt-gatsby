import React from "react";
import { RecentlyViewed } from "./RecentlyViewed";
import { useStaticQuery, Link, graphql } from "gatsby";
import clsx from "clsx";
import { FaFacebookSquare as Fb, FaInstagram as Insta } from "react-icons/fa";
import { NewsletterSmall } from "../Newsletter";
import { FooterColumn } from "./FooterColumn";

const FOOTER_QUERY = graphql`
  query {
    wp {
      options {
        footerData {
          companyNumber
          facebook
          fieldGroupName
          instagram
          vatNumber
        }
      }
    }
    footerMenu: allWpMenuItem(filter: { locations: { eq: FOOTER } }) {
      nodes {
        ...MenuItem
      }
    }
  }
`;

const FooterItem = ({ children }) => {
  return <li className="mb-5 text-white">{children}</li>;
};

export const Footer = () => {
  const data = useStaticQuery(FOOTER_QUERY);
  const { footerData: footer } = data.wp.options;
  const { companyNumber, facebook, instagram } = footer || {};
  const { nodes: menuItems } = data.footerMenu;
  return (
    <>
      <RecentlyViewed />
      <footer className="pb-10 bg-darkBlue pt-14 text-[20px]">
        <div
          className={clsx(
            "container px-5 2xl:px-0 max-w-big",
            "grid grid-cols-1 gap-8  sm:grid-cols-2 lg:grid-cols-4"
          )}
        >
          <FooterColumn title="About">
            <ul>
              <FooterItem>
                <Link to="/about-us" className="text-white">
                  About us
                </Link>
              </FooterItem>
              <FooterItem>
                <Link to="/writers" className="text-white">
                  Our writers
                </Link>
              </FooterItem>
              <FooterItem>Company number: {companyNumber}</FooterItem>
              <FooterItem>Registered Office:</FooterItem>
              <FooterItem>
                Birchin Court, 20 Birchin Lane, London, EC3V 9DU{companyNumber}
              </FooterItem>
            </ul>
          </FooterColumn>
          <FooterColumn title="Social Acounts">
            <div className="flex">
              <a
                href={facebook}
                rel="noreferrer"
                target="_blank"
                className="mr-5 no-underline text-gold hover:text-lightGold"
              >
                <Fb className="w-[40px] h-[40px]" />
              </a>
              <a
                href={instagram}
                target="_blank"
                rel="noreferrer"
                className="no-underline text-gold hover:text-lightGold"
              >
                <Insta className="w-[40px] h-[40px]" />
              </a>
            </div>
          </FooterColumn>
          <FooterColumn title="Helpful links">
            <ul>
              {menuItems?.map((item) => {
                const { id, label, path } = item;
                return (
                  <FooterItem key={id}>
                    <Link to={path} className="text-white">
                      {label}
                    </Link>
                  </FooterItem>
                );
              })}
            </ul>
          </FooterColumn>
          <FooterColumn title="Newsletter sign-up">
            <NewsletterSmall />
          </FooterColumn>
        </div>
        <div className="container px-5 mt-5 max-w-big text-gold 2xl:px-0">
          © {new Date().getFullYear()} Bucket List Travels. All rights reserved.
        </div>
      </footer>
    </>
  );
};
