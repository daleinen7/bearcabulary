import React, { useReducer, useEffect } from 'react';

// Alphabets to be used for generated selectable letters
const alphabet = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

const types = {
  nextLetter: 'nextLetter',
  prevLetter: 'prevLetter',
  setSelectableLetters: 'setSelectableLetters',
};

const reducer = (state, action) => {
  switch (action.type) {
    case types.nextLetter:
      return { ...state, letterCounter: state.letterCounter + 1 };
    case types.prevLetter:
      return {
        ...state,
        letterCounter: state.letterCounter === 0 ? 0 : state.letterCounter - 1,
      };
    case types.setSelectableLetters:
      return { ...state, selectableLetters: action.payload };
  }
};

const initialLetterState = {
  letterCounter: 0,
  selectableLetters: [],
  clickedLetterIndexes: [],
};

export default function LetterSelection({ word }) {
  const [letterState, dispatch] = useReducer(reducer, initialLetterState);

  // Generating selectable letters
  const makeSelectableLetters = (word) => {
    let generated = word.split('');
    for (let i = generated.length; i < 10; i++) {
      generated.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
    }
    return shuffleArray(generated);
  };

  // Helper function to shuffle an Array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    dispatch({
      type: types.setSelectableLetters,
      payload: makeSelectableLetters(word),
    });
  }, [word]);

  return (
    <>
      <h2>Letters to choose</h2>
    </>
  );
}
