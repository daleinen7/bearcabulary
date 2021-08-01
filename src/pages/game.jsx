import React, { useReducer, useEffect } from "react";
import Layout from "../components/Layout";
import Picture from "../components/Picture";
import Sentence from "../components/Sentence";
import Guesses from "../components/Guesses";
import LetterSelection from "../components/LetterSelection";

const types = {
  nextPage: "nextPage",
  prevPage: "prevPage",
  checkWord: "checkWord",
  initialize: "initialize",
};

const initialGameState = {
  pageCounter: 0, // the counter to keep track of which page the game is currently at
  corrects: [], // keeps track of words the user have gotten right
  errors: [], // keeps track of words the user have gotten wrong
  guesses: [],
  story: {
    title: "",
    level: 0,
    section: [
      {
        img: "",
        sentence: "",
        word: "",
      },
    ],
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case types.nextPage: // increments counter in gameState
      if (
        !state.story.section[state.pageCounter].word ||
        state.corrects.includes(
          state.story.section[state.pageCounter].word.toUpperCase()
        )
      ) {
        // checking if word is not null
        return {
          ...state,
          pageCounter:
            state.pageCounter === state.story.section.length - 1
              ? state.story.section.length - 1
              : state.pageCounter + 1,
          guesses: [],
        };
      } else {
        return state;
      }

    case types.prevPage: // check if pageCounter has reached the end, then decrements counter in gameState
      return {
        ...state,
        pageCounter: state.pageCounter === 0 ? 0 : state.pageCounter - 1,
        guesses: [],
      };

    case types.checkWord:
      const payloadWord = action.payload.join("").toUpperCase(); // word submitted by user
      const currentWord =
        state.story.section[state.pageCounter].word.toUpperCase(); // current word in the word bank

      if (
        currentWord === payloadWord &&
        !state.corrects.includes(currentWord)
      ) {
        // if user submitted word is correct and has not been documented in the corrects array
        return {
          ...state,
          corrects: [...state.corrects, currentWord],
        };
      } else if (currentWord !== payloadWord) {
        // if user submitted word is wrong
        //* the way newGueses are set up here are very verbose, needs fixing
        if (!state.errors.includes(currentWord)) {
          if (state.guesses.length > 3) {
            let newGuesses = state.guesses;
            newGuesses.push(payloadWord);
            newGuesses.shift();
            return {
              ...state,
              errors: [...state.errors, currentWord],
              guesses: newGuesses,
            };
          } else {
            let newGuesses = [...state.guesses, payloadWord];
            return {
              ...state,
              errors: [...state.errors, currentWord],
              guesses: newGuesses,
            };
          }
        } else {
          if (state.guesses.length > 3) {
            let newGuesses = state.guesses;
            newGuesses.push(payloadWord);
            newGuesses.shift();
            return {
              ...state,
              guesses: newGuesses,
            };
          } else {
            let newGuesses = [...state.guesses, payloadWord];
            return {
              ...state,
              guesses: newGuesses,
            };
          }
        }
      } else {
        return state;
      }

    case types.initialize:
      return {
        ...state,
        story: action.payload,
      };

    default:
      return state;
  }
};

export default function Game({ location }) {
  // console.log(location);
  const [gameState, dispatch] = useReducer(reducer, initialGameState);

  useEffect(() => {
    dispatch({ type: types.initialize, payload: location.state.data });
  }, []);

  return (
    <Layout>
      <div>{gameState.pageCounter}</div>
      <button onClick={() => dispatch({ type: types.prevPage })}>Prev</button>
      <button onClick={() => dispatch({ type: types.nextPage })}>Next</button>
      <Picture picture={gameState.story.section[gameState.pageCounter].img} />
      <Sentence
        word={gameState.story.section[gameState.pageCounter].word}
        sentence={gameState.story.section[gameState.pageCounter].sentence}
      />
      <Guesses
        guesses={gameState.guesses}
        word={gameState.story.section[gameState.pageCounter].word}
      />
      {gameState.story.section[gameState.pageCounter].word && (
        <LetterSelection
          word={gameState.story.section[gameState.pageCounter].word}
          dispatchGame={dispatch}
          typesGame={types}
        />
      )}
    </Layout>
  );
}
