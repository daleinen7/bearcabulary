import React from "react";
import * as styles from "./SummaryEntry.module.scss";
import Error from "../Error";

export default function SummaryEntry({ word, errors }) {
  return (
    <li className={styles.entry_container}>
      <div className={styles.word}>{word}</div>
      {!errors
        ? ""
        : errors.slice(0, 5).map((error, index2) => {
            return (
              <div key={index2} className={styles.error}>
                <Error errorWord={error} word={word} />
              </div>
            );
          })}
    </li>
  );
}
