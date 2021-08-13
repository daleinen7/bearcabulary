import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import Hero from "../components/Hero";
import StoriesList from "../components/StoriesList";
import About from "../components/About";
import Layout from "../components/Layout";
import "../styles/style.scss";

export default function Index() {
  const data = useStaticQuery(graphql`
    query Stories {
      allStoriesJson {
        nodes {
          title
          level
          section {
            img
          }
          parent {
            ... on File {
              name
            }
          }
        }
      }
    }
  `);

  return (
    <Layout>
      <Hero />
      <StoriesList stories={data.allStoriesJson.nodes} images={data.allFile} />
      <About />
    </Layout>
  );
}
