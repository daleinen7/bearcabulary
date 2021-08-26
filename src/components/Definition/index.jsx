import React, { useEffect, useState } from "react";
import * as styles from "./Definition.module.scss";
import TextToSpeech from "../TextToSpeech";

function FadeInText({ definition, word }) {
  return (
    <div className={styles.definition_container}>
      {definition && (
        <div className={`${styles.definition}`}>
          <span>Definition</span> {definition}.
        </div>
      )}
      <TextToSpeech word={word} />
    </div>
  );
}

export default function Definition({ word, corrects }) {
  const [definition, setDefinition] = useState();
  const [hide, setHide] = useState(null);

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
      if (!corrects.includes(word?.toUpperCase())) {
        setHide(true);
      } else {
        setHide(false);
      }
    }
  }, [word]);

  return <FadeInText key={word} word={word} definition={definition} />;
}
