import React from "react";
import * as styles from "./Guesses.module.scss";

export default function Guesses({ guesses, word }) {
  return (
    <div className={styles.guesses_container}>
      {guesses.map((guess, index) => {
        return (
          <div className={styles.guess} key={index}>
            {guess.split("").map((guessLetter, index2) => {
              return (
                <span
                  key={index2}
                  className={
                    word[index2].toUpperCase() !== guessLetter
                      ? styles.incorrect
                      : ""
                  }
                >
                  {guessLetter}
                </span>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
