require("dotenv").config();

module.exports = {
  siteMetadata: {
    siteUrl: `https://bearcabulary.netlify.app`,
    title: `Bearcabulary`,
    description: `Spelling app`,
  },
  plugins: [
    `gatsby-plugin-netlify-cms`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    `gatsby-transformer-json`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `stories`,
        path: `./static/stories/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `./static/img/`,
      },
    },
  ],
};
