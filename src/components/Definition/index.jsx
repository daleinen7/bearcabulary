import React, { useEffect, useState } from "react";
import * as styles from "./Definition.module.scss";
import TextToSpeech from "../TextToSpeech";
import { IoMdClose } from "react-icons/io";

export default function Definition({ word, corrects }) {
  const [definition, setDefinition] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

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
      corrects.includes(word?.toUpperCase())
        ? setIsCorrect(true)
        : setIsCorrect(false);
    }
  }, [word, corrects]);

  const handleClick = () => {
    modalOpen ? setModalOpen(false) : setModalOpen(true);
  };

  const style = {
    animationDelay: "0s",
    margin: "0",
  };

  return (
    <>
      <div
        className={`${styles.definition_mobile} ${
          modalOpen ? styles.open : ""
        }`}
      >
        <button class={styles.close_button} onClick={handleClick}>
          <IoMdClose size={20} />
        </button>
        <div className={styles.logo}>Definition</div>
        {definition}
      </div>
      <div
        key={word}
        style={isCorrect ? style : {}}
        className={styles.definition_container}
      >
        {definition && (
          <div className={styles.definition} onClick={handleClick}>
            <span className={styles.logo}>Definition</span>
            <span className={styles.definition_sentence}>{definition}.</span>
          </div>
        )}
        <TextToSpeech word={word} />
      </div>
    </>
  );
}
