import React, { useReducer, useEffect } from 'react';
import {
  makeSelectableLetters,
  makeBlankLetters,
} from '../../utilities/letterSelectionUtil';

const types = {
  prevLetter: 'prevLetter',
  addLetter: 'addLetter',
  initialize: 'initialize',
};

const reducer = (state, action) => {
  switch (action.type) {
    case types.prevLetter: // decrements counter in letterState
      return {
        ...state,
        letterCounter: state.letterCounter === 0 ? 0 : state.letterCounter - 1,
      };

    case types.addLetter: // replaces empty strings in clickedLetters array with letter, "pushes" indexe of letter to clickedLetterIndexes, and increments the counter
      if (!state.clickedLetterIndexes.includes(action.payload.index)) {
        return {
          ...state,
          letterCounter: state.letterCounter + 1,
          clickedLetters: state.clickedLetters.map((letter, index) => {
            if (index === state.letterCounter) {
              letter = action.payload.letter;
            }
            return letter;
          }),
          clickedLetterIndexes: [
            ...state.clickedLetterIndexes,
            action.payload.index,
          ],
        };
      } else {
        return state;
      }

    case types.initialize: // initalize the state with resetting letterCounter, new selectable letters, and new blank strings
      return {
        letterCounter: 0,
        selectableLetters: makeSelectableLetters(action.payload),
        clickedLetters: makeBlankLetters(action.payload),
        clickedLetterIndexes: [],
      };

    default:
      return state;
  }
};

const initialLetterState = {
  letterCounter: 0,
  selectableLetters: [],
  clickedLetters: [],
  clickedLetterIndexes: [], // keeps track of letter indexes that were clicked
};

export default function LetterSelection({ word }) {
  const [letterState, dispatch] = useReducer(reducer, initialLetterState);

  useEffect(() => {
    dispatch({
      type: types.initialize,
      payload: word,
    });
  }, [word]);

  return (
    <>
      {letterState.clickedLetters.map((clickedLetter, indes) => {
        return <div>{clickedLetter}</div>;
      })}

      {/* Buttons to select the letters */}
      {letterState.selectableLetters.map((selectableLetter, index) => {
        return (
          <button
            key={index}
            onClick={() =>
              dispatch({
                type: types.addLetter,
                payload: { index: index, letter: selectableLetter },
              })
            }
          >
            {selectableLetter}
          </button>
        );
      })}
    </>
  );
}
