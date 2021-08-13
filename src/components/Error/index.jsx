import React from "react";
import * as styles from "./Error.module.scss";

export default function Error({ errorWord, word }) {
  return (
    <>
      {errorWord.split("").map((letter, index) => {
        return (
          <span
            key={index}
            className={
              word[index].toUpperCase() !== letter ? styles.incorrect : ""
            }
          >
            {letter}
          </span>
        );
      })}
    </>
  );
}
