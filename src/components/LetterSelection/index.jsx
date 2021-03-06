import React, { useEffect, useReducer } from "react";
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
  setCorrectInLetters: "setCorrectInLetters",
  setTrueInCheck: "setTrueInCheck",
  setFalseInCheck: "setFalseInCheck",
};

const initialLetterState = {
  letterCounter: 0,
  selectableLetters: [],
  clickedLetters: [], // keeps track of letters that were clicked
  clickedLetterIndexes: [], // keeps track of letter indexes that were clicked
  correct: false,
  incorrect: false,
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

    case types.setCorrectInLetters:
      return {
        ...state,
        correct: true,
      };

    case types.setTrueInCheck:
      return {
        ...state,
        incorrect: true,
      };

    case types.setFalseInCheck:
      return {
        ...state,
        incorrect: false,
      };

    case types.initialize: // initalize the state with resetting letterCounter, new selectable letters, and new blank strings
      const isCorrect = action.payload.corrects.includes(
        action.payload.word.toUpperCase()
      );

      return {
        ...state,
        correct: isCorrect ? true : false,
        incorrect: false,
        letterCounter: 0,
        selectableLetters: makeSelectableLetters(
          action.payload.word.toUpperCase()
        ),
        clickedLetters: isCorrect
          ? action.payload.word.split("")
          : makeBlankLetters(action.payload.word),
        clickedLetterIndexes: [],
      };

    default:
      return state;
  }
};

export default function LetterSelection({
  word,
  corrects,
  dispatchGame,
  typesGame,
}) {
  const [letterState, dispatch] = useReducer(reducer, initialLetterState);

  useEffect(() => {
    dispatch({
      type: types.initialize,
      payload: { word: word, corrects: corrects },
    });
  }, [word, corrects]);

  return (
    <div className={styles.letters_container}>
      <div className={styles.clicked_letters_container}>
        {letterState.clickedLetters.map((clickedLetter, index) => {
          return (
            <div
              className={`${styles.clicked_letter} ${
                letterState.correct ? styles.correct : ""
              } ${
                letterState.incorrect &&
                letterState.clickedLetters[index] !== word[index]?.toUpperCase()
                  ? styles.wrong
                  : ""
              }`}
              key={index}
            >
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
                  letterState.clickedLetterIndexes.includes(index) ||
                  letterState.correct
                    ? styles.disabled
                    : ""
                } ${
                  letterState.clickedLetters.length ===
                  letterState.clickedLetterIndexes.length
                    ? styles.filled
                    : ""
                }`}
                onClick={() => {
                  if (!letterState.correct) {
                    dispatch({
                      type: types.addLetter,
                      payload: index,
                    });
                  }
                }}
              >
                {selectableLetter}
              </button>
            );
          })}
        </div>
        <div className={styles.utility_buttons_container}>
          <button
            className={`${styles.backspace} ${
              letterState.correct ? styles.disabled : ""
            }`}
            onClick={() => dispatch({ type: types.removeLetter })}
          >
            <TiBackspace />
          </button>
          <button
            className={`${styles.submit} ${
              letterState.correct ? styles.disabled : ""
            }`}
            onClick={() => {
              if (!letterState.correct) {
                if (letterState.clickedLetters.join("") === "") {
                  dispatch({
                    type: types.setTrueInCheck,
                  });
                  setTimeout(() => {
                    dispatch({
                      type: types.setFalseInCheck,
                    });
                  }, 1000);
                } else {
                  dispatchGame({
                    type: typesGame.checkWord,
                    payload: {
                      clickedLetters: letterState.clickedLetters,
                      letterDispatch: dispatch,
                      setCorrectInLetters: types.setCorrectInLetters,
                      setTrueInCheck: types.setTrueInCheck,
                      setFalseInCheck: types.setFalseInCheck,
                    },
                  });
                }
              }
            }}
          >
            <GrReturn />
          </button>
        </div>
      </div>
    </div>
  );
}
