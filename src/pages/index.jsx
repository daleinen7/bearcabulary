import React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import Hero from "../components/Hero";
import StoryList from "../components/StoryList";
import About from "../components/About";
import Layout from "../components/Layout";
import "../styles/style.scss";

export default function Index() {
  const data = useStaticQuery(graphql`
    query Stories {
      allStoriesJson {
        nodes {
          title
          section {
            image
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
      <StoryList stories={data.allStoriesJson} />
      <About />
    </Layout>
  );
}
