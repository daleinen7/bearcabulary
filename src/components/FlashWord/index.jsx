import React, { useState, useEffect } from "react";

export default function Sentence({ corrects, word }) {
  const [appear, setAppear] = useState(true);

  useEffect(() => {
    if (!corrects.includes(word?.toUpperCase())) {
      setAppear(true);
      const timer = setTimeout(() => {
        setAppear(false);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      setAppear(false);
    }
  }, [word]);

  return (
    <>
      <h2
        style={{ visibility: appear ? "" : "hidden" }}
        className={appear ? "" : "hidden"}
      >
        {word}
      </h2>
    </>
  );
}
