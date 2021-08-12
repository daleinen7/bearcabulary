import React, { useState, useEffect } from "react";
import * as styles from "./FlashWord.module.scss";

export default function FlashWord({ corrects, word }) {
  const [hide, setHide] = useState(true);

  useEffect(() => {
    if (!corrects.includes(word?.toUpperCase())) {
      setHide(true);
      const timer = setTimeout(() => {
        setHide(false);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setHide(false);
    }
  }, [word, corrects]);

  return (
    <p className={styles.word}>
      {word.split("").map((letter, idx) => {
        let style = {
          transition: "opacity .5s ease-in-out",
          "transition-delay": idx / 10 + "s",
        };
        return (
          <span key={idx} style={style} className={hide ? "" : styles.hidden}>
            {letter}
          </span>
        );
      })}
    </p>
  );
}
