require("dotenv").config();

module.exports = {
  siteMetadata: {
    siteUrl: `https://www.bearcabulary.com`,
    title: `Bearcabulary`,
    description: `Bearcabulary is a word game for children K-3 that tests students to spell a missing word in a sentence using jumbled letters.`,
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
