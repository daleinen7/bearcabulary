import React from "react";
import { graphql } from "gatsby";

export default function Story({ data }) {
  return (
    <>
      <h1>{data.storiesJson.title}</h1>
    </>
  );
}

export const query = graphql`
  query ($title: String!) {
    storiesJson(title: { eq: $title }) {
      title
      section {
        img
        sentence
        word
      }
    }
  }
`;
