const fs = require("fs");
require("dotenv").config({
  path:
    (fs.existsSync(`.env.${process.env.NODE_ENV}`) &&
      `.env.${process.env.NODE_ENV}`) ||
    ".env",
});
const path = require("path");
const {
  title,
  author,
  description,
  pathPrefix,
  ...options
} = require("./config");
const siteUrl = process.env.GATSBY_SITE_URL || options.siteUrl;
module.exports = {
  pathPrefix,
  siteMetadata: {
    title,
    description,
    author,
    wordPressUrl: process.env.GATSBY_WP_URL,
    siteUrl,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-emotion`,
    `gatsby-plugin-no-sourcemaps`,
    'gatsby-plugin-robots-txt',
    {
      resolve: "gatsby-plugin-gatsby-cloud",
      options: {
        headers: {
          "/*": ["Referrer-Policy: strict-origin-when-cross-origin"],
        },
      },
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        queries: require("./src/utils/algolia-queries"),
      },
    },
    {
      resolve: `@gatsbywpthemes/gatsby-theme-blog-data`,
      options: {
        ...options,
        wordPressUrl: process.env.GATSBY_WP_URL,
      },
    },
    {
      resolve: "gatsby-plugin-root-import",
      options: {
        baseSrc: path.join(__dirname, "src"),
        basePages: path.join(__dirname, "src/pages"),
        baseStyles: path.join(__dirname, "src/styles"),
        baseComponents: path.join(__dirname, "src/components"),
        baseUiComponents: path.join(__dirname, "src/components/ui-components"),
        baseUtils: path.join(__dirname, "src/utils"),
        baseThemeConfig: path.join(__dirname, "themeConfig"),
      },
    },
  ],
};
