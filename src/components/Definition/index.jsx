import React, { useEffect, useState } from "react";
import * as styles from "./Definition.module.scss";
import TextToSpeech from "../TextToSpeech";

export default function Definition({ word }) {
  const [definition, setDefinition] = useState();
  const [showDef, setShowDef] = useState(false);

  const handleDef = () => {
    const defState = !showDef;
    setShowDef(defState);
  };

  useEffect(() => {
    if (word) {
      async function fetchData() {
        const result = await fetch(
          `https://www.dictionaryapi.com/api/v3/references/sd2/json/${word}?key=${process.env.GATSBY_MERRIAM_APIKEY}`
        ).then((res) => res.json());
        setDefinition(
          result[0].shortdef[0].replace(/^\w/, (firstLetter) =>
            firstLetter.toUpperCase()
          )
        );
      }
      fetchData();
    }
  }, [word]);

  return (
    <div className={styles.definition_container}>
      {definition && (
        <div className={styles.definition} onClick={handleDef}>
          <span>Definition</span> {showDef && <div>{definition}.</div>}
        </div>
      )}
      <TextToSpeech word={word} />
    </div>
  );
}
