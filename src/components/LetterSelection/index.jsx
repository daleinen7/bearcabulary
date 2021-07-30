import React, { useReducer, useEffect } from 'react';
import { makeSelectableLetters } from '../../utilities/letterSelectionUtil';

const types = {
  nextLetter: 'nextLetter',
  prevLetter: 'prevLetter',
  setSelectableLetters: 'setSelectableLetters',
  addLetter: 'addLetter',
};

const reducer = (state, action) => {
  switch (action.type) {
    case types.nextLetter: // increments counter in letterState
      return { ...state, letterCounter: state.letterCounter + 1 };
    case types.prevLetter: // decrements counter in letterState
      return {
        ...state,
        letterCounter: state.letterCounter === 0 ? 0 : state.letterCounter - 1,
      };
    case types.setSelectableLetters: // replaces selectable letters
      return { ...state, selectableLetters: action.payload };
    case types.addLetter:
      if (state.clickedLetterIndexes.length <= state.selectableLetters.length) {
        return {
          ...state,
          clickedLetterIndexes: [...state.clickedLetterIndexes, action.payload],
        };
      } else {
        return state;
      }
  }
};

const initialLetterState = {
  letterCounter: 0,
  selectableLetters: [],
  clickedLetterIndexes: [],
};

export default function LetterSelection({ word }) {
  const [letterState, dispatch] = useReducer(reducer, initialLetterState);

  useEffect(() => {
    dispatch({
      type: types.setSelectableLetters,
      payload: makeSelectableLetters(word),
    });
  }, [word]);

  return (
    <>
      {letterState.selectableLetters.map((selectableLetter, index) => {
        return (
          <button
            key={index}
            onClick={() => dispatch({ type: types.addLetter, payload: index })}
          >
            {selectableLetter}
          </button>
        );
      })}
    </>
  );
}
