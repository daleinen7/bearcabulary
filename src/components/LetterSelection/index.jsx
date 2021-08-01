import React, { useReducer, useEffect } from "react";
import * as styles from "./LetterSelection.module.scss";
import {
  makeSelectableLetters,
  makeBlankLetters,
} from "../../utilities/letterSelectionUtil";
import { TiBackspace } from "react-icons/ti";
import { GrReturn } from "react-icons/gr";

const types = {
  prevLetter: "prevLetter",
  addLetter: "addLetter",
  removeLetter: "removeLetter",
  initialize: "initialize",
};

const initialLetterState = {
  letterCounter: 0,
  selectableLetters: [],
  clickedLetters: [], // keeps track of letters that were clicked
  clickedLetterIndexes: [], // keeps track of letter indexes that were clicked
};

const reducer = (state, action) => {
  switch (action.type) {
    case types.prevLetter: // decrements counter in letterState
      return {
        ...state,
        letterCounter: state.letterCounter === 0 ? 0 : state.letterCounter - 1,
      };

    case types.addLetter: // checks if clicked letter's index is already in clickedLetterIndexes of the letterState and also if letterCounter is lower than the word's length, then replaces empty strings in clickedLetters array with letter, "pushes" index of letter to clickedLetterIndexes, and increments the counter
      if (
        !state.clickedLetterIndexes.includes(action.payload) &&
        state.letterCounter < state.clickedLetters.length
      ) {
        return {
          ...state,
          letterCounter: state.letterCounter + 1,
          clickedLetters: state.clickedLetters.map((letter, index) => {
            if (index === state.letterCounter) {
              letter = state.selectableLetters[action.payload];
            }
            return letter;
          }),
          clickedLetterIndexes: [...state.clickedLetterIndexes, action.payload],
        };
      } else {
        return state;
      }

    case types.removeLetter:
      const clickedLetterIndexesPopped = state.clickedLetterIndexes.slice(
        0,
        -1
      );
      return {
        ...state,
        letterCounter: state.letterCounter === 0 ? 0 : state.letterCounter - 1,
        clickedLetters: state.clickedLetters.map((letter, index) => {
          if (index + 1 === state.letterCounter) {
            letter = "";
          }
          return letter;
        }),
        clickedLetterIndexes: clickedLetterIndexesPopped,
      };

    case types.initialize: // initalize the state with resetting letterCounter, new selectable letters, and new blank strings
      return {
        ...state,
        letterCounter: 0,
        selectableLetters: makeSelectableLetters(action.payload),
        clickedLetters: makeBlankLetters(action.payload),
        clickedLetterIndexes: [],
      };

    default:
      return state;
  }
};

export default function LetterSelection({ word, dispatchGame, typesGame }) {
  const [letterState, dispatch] = useReducer(reducer, initialLetterState);

  useEffect(() => {
    dispatch({
      type: types.initialize,
      payload: word,
    });
  }, [word]);

  return (
    <>
      <div className={styles.clicked_letters_container}>
        {letterState.clickedLetters.map((clickedLetter, index) => {
          return (
            <div className={styles.clicked_letter} key={index}>
              {clickedLetter}
            </div>
          );
        })}
      </div>

      <div className={styles.buttons_container}>
        {/* Buttons to select the letters */}
        <div className={styles.selectable_letters_container}>
          {letterState.selectableLetters.map((selectableLetter, index) => {
            return (
              <button
                key={index}
                className={`${styles.selectable_letter} ${
                  letterState.clickedLetterIndexes.includes(index)
                    ? styles.clicked
                    : ""
                } ${
                  letterState.clickedLetters.length ===
                  letterState.clickedLetterIndexes.length
                    ? styles.filled
                    : ""
                }`}
                onClick={() =>
                  dispatch({
                    type: types.addLetter,
                    payload: index,
                  })
                }
              >
                {selectableLetter}
              </button>
            );
          })}
        </div>
        <div className={styles.utility_buttons_container}>
          <button
            className={styles.backspace}
            onClick={() => dispatch({ type: types.removeLetter })}
          >
            <TiBackspace />
          </button>
          <button
            className={styles.submit}
            onClick={() =>
              dispatchGame({
                type: typesGame.checkWord,
                payload: letterState.clickedLetters,
              })
            }
          >
            <GrReturn />
          </button>
        </div>
      </div>
    </>
  );
}
