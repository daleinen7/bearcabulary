import React, { useState, useEffect } from "react";
import * as styles from "./FlashWord.module.scss";

export default function FlashWord({ corrects, word }) {
  const [show, setShow] = useState(null);

  useEffect(() => {
    corrects.includes(word?.toUpperCase()) ? setShow(false) : setShow(true);
  }, [word, corrects]);

  return (
    <>
      {show && (
        <p key={word} className={styles.word}>
          {word.split("").map((letter, index) => {
            const style = {
              animationDelay: (index / word.length) * 0.5 + 0.25 + "s",
            };
            return (
              <span key={index} style={style} className={styles.letter}>
                {letter}
              </span>
            );
          })}
        </p>
      )}
    </>
  );
}
