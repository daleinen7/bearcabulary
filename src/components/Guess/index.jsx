import React from 'react';

export default function Guess({ guesses, word }) {
  return (
    <>
      {guesses.map((guess, index) => {
        return <div key={index}>{guess}</div>;
      })}
    </>
  );
}
