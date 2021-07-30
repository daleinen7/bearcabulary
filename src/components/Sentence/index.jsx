import React from 'react';

export default function Sentence({ word, sentence }) {
  return (
    <>
      <h2>{word}</h2>
      <h2>{sentence}</h2>
    </>
  );
}
