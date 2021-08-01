import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import "../styles/style.scss";

export default function Index({ data }) {
  return (
    <Layout>
      <h2>This is the landing page</h2>
      <ul>
        {data.allStoriesJson.edges.map((edge, index) => {
          return (
            <li key={index}>
              <Link to="/game" state={{ data: edge.node }}>
                {edge.node.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
}

export const query = graphql`
  query Stories {
    allStoriesJson {
      edges {
        node {
          title
          section {
            img
            sentence
            word
          }
          level
        }
      }
    }
  }
`;
