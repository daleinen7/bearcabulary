import React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import Layout from "../components/Layout";
import "../styles/style.scss";

export default function Index() {
  const data = useStaticQuery(graphql`
    query Stories {
      allStoriesJson {
        nodes {
          title
          parent {
            ... on File {
              name
            }
          }
          section {
            img
            sentence
            word
          }
        }
      }
      storiesJson {
        parent {
          ... on File {
            id
            name
          }
        }
      }
    }
  `);

  return (
    <Layout>
      <h2>This is the landing page</h2>
      {data.allStoriesJson.nodes.map((node) => {
        return (
          <ul>
            <li>
              <Link to={node.parent.name}>{node.title}</Link>
            </li>
          </ul>
        );
      })}
    </Layout>
  );
}
