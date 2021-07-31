import React, { useReducer } from "react";
import Layout from "../components/Layout";
import Picture from "../components/Picture";
import Sentence from "../components/Sentence";
import Guesses from "../components/Guesses";
import LetterSelection from "../components/LetterSelection";

const types = {
  nextPage: "nextPage",
  prevPage: "prevPage",
  checkWord: "checkWord",
};

const initialGameState = {
  pageCounter: 0, // the counter to keep track of which page the game is currently at
  corrects: [], // keeps track of words the user have gotten right
  errors: [], // keeps track of words the user have gotten wrong
  guesses: [],
  story: {
    title: "Star Wars",
    level: 2,
    section: [
      {
        img: "https://www.gannett-cdn.com/presto/2020/02/27/USAT/ec0879e6-eec9-4d41-bf4c-b7e1d03e57ca-yoda-luke.jpeg?crop=957,718,x128,y0&quality=50&width=640",
        sentence: "Luke is ___ because Yoda is mean.",
        word: "Sad",
      },
      {
        img: "https://observer.com/wp-content/uploads/sites/2/2020/05/yoda-art-observer.jpg?quality=80&w=970",
        sentence: "Yoda is ___ in Luke's incredible incompetence. ",
        word: "disappoint",
      },
      {
        img: "https://pbs.twimg.com/media/E4Edy8gWYAU_MNu?format=jpg&name=small",
        sentence: "Recursion meme",
      },
      {
        img: "https://cdn.mos.cms.futurecdn.net/TTgifeqA8zmsNjgvtHLekJ.jpg",
        sentence: "Luke wants Yoda to just got off his ___",
        word: "Back",
      },
      {
        img: "https://lumiere-a.akamaihd.net/v1/images/01_194dfed7.jpeg?region=0%2C0%2C1024%2C576&width=960",
        sentence: "But Yoda is having __ of it.",
        word: "None",
      },
      {
        img: "http://farfarawayradio.com/wp-content/uploads/2017/01/Yodas-Death-1024x425.png",
        sentence: "Yoda feels better after a nap.",
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

    default:
      return state;
  }
};

export default function Game() {
  const [gameState, dispatch] = useReducer(reducer, initialGameState);

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
