import React from "react";

export default function Guesses({ guesses, word }) {
  return (
    <>
      {guesses.map((guess, index) => {
        return (
          <div key={index}>
            {guess.split("").map((guessLetter, index2) => {
              return (
                <span
                  key={index2}
                  className={word[index2] === guessLetter ? "true" : "false"}
                >
                  {guessLetter}
                </span>
              );
            })}
          </div>
        );
      })}
    </>
  );
}
