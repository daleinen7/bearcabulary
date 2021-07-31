import React, { useState, useEffect } from "react";

export default function Sentence({ word, sentence }) {
  const [wordTimer, setWordTimer] = useState(false);

  useEffect(() => {
    setWordTimer(false);
    const timer = setTimeout(() => {
      setWordTimer(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, [word]);

  return (
    <>
      <h2
        style={{ visibility: wordTimer ? "hidden" : "" }}
        className={wordTimer ? "hidden" : ""}
      >
        {word}
      </h2>
      <h2>{sentence}</h2>
    </>
  );
}
