import type { GatsbyConfig } from 'gatsby';
import path from 'path';

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
    siteUrl: `https://gatsbystarterdefaultsource.gatsbyjs.io/`
  },
  plugins: [
    'gatsby-plugin-emotion',
    'gatsby-plugin-image',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/src/assets`
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/assets/images/gatsby-icon.png' // This path is relative to the root of the site.
      }
    },
    {
      resolve: 'gatsby-plugin-preload',
      options: {
        preloaders: [
          {
            as: 'fetch',
            href: '/config.json',
            crossOrigin: 'anonymous'
          }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-page-creator',
      options: {
        path: path.resolve(__dirname, 'src/pages'),
        ignore: [`**/_*/**/*.{ts,tsx}`]
      }
    }
  ]
};

export default config;
