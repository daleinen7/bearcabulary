import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import Hero from "../components/Hero";
import StoriesList from "../components/StoriesList";
import About from "../components/About";
import Footer from "../components/Footer";
import "../styles/style.scss";

export default function Index({ location }) {
  const data = useStaticQuery(graphql`
    query Stories {
      allStoriesJson {
        nodes {
          title
          level
          title_card
          parent {
            ... on File {
              name
            }
          }
        }
      }
      allFile(filter: { sourceInstanceName: { eq: "images" } }) {
        nodes {
          relativePath
          childrenImageSharp {
            gatsbyImageData(width: 1000, placeholder: NONE)
          }
        }
      }
    }
  `);

  return (
    <>
      <Hero />
      <StoriesList
        stories={data.allStoriesJson.nodes}
        images={data.allFile.nodes}
      />
      <About />
      <Footer />
    </>
  );
}
