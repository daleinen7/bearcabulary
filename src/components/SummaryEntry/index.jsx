import React from "react";
import * as styles from "./SummaryEntry.module.scss";

export default function SummaryEntry({ word, errors }) {
  console.log("POOP", errors);
  return (
    <li className={styles.entry_container}>
      <div className={styles.word}>{word}</div>
      <ul className={styles.errors_container}>
        {!errors
          ? ""
          : errors.slice(0, 5).map((error, index2) => {
              return (
                <li key={index2} className={styles.error}>
                  {error}
                </li>
              );
            })}
      </ul>
    </li>
  );
}
