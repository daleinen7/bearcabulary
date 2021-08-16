import React from "react";

export default function Definition({ definition }) {
  const apiKey = process.env.GATSBY_MERRIAM_APIKEY;
  console.log("POOP", apiKey);
  return <div>{definition}</div>;
}
