import React, { useEffect, useState } from "react";

export default function Definition({ word }) {
  const [definition, setDefinition] = useState("");

  useEffect(() => {
    if (word) {
      async function fetchData() {
        const result = await fetch(
          `https://www.dictionaryapi.com/api/v3/references/sd2/json/${word}?key=${process.env.GATSBY_MERRIAM_APIKEY}`
        ).then((res) => res.json());
        setDefinition(result[0].shortdef[0]);
      }
      fetchData();
    }
  }, [word]);

  return <div>{definition}</div>;
}
