import React, { useReducer, useEffect } from "react";
import { graphql, Link } from "gatsby";
import * as styles from "./Game.module.scss";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import Layout from "../components/Layout";
import Picture from "../components/Picture";
import FlashWord from "../components/FlashWord";
import Sentence from "../components/Sentence";
import LetterSelection from "../components/LetterSelection";
import Progress from "../components/Progress";

const types = {
  nextPage: "nextPage",
  prevPage: "prevPage",
  checkWord: "checkWord",
  initialize: "initialize",
};

const initialGameState = {
  pageCounter: 0, // the counter to keep track of which page the game is currently at
  corrects: [], // keeps track of words the user have gotten right
  errors: {}, // keeps track of words the user have gotten wrong
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
        };
      } else {
        return state;
      }

    case types.prevPage: // check if pageCounter has reached the end, then decrements counter in gameState
      return {
        ...state,
        pageCounter: state.pageCounter === 0 ? 0 : state.pageCounter - 1,
      };

    case types.checkWord:
      const payloadWord = action.payload.clickedLetters.join(""); // word submitted by user
      const currentWord =
        state.story.section[state.pageCounter].word.toUpperCase(); // current word in the word bank

      if (
        currentWord === payloadWord &&
        !state.corrects.includes(currentWord)
      ) {
        // if user submitted word is correct and has not been documented in the corrects array
        action.payload.letterDispatch({
          type: action.payload.setCorrectInLetters,
        });

        return {
          ...state,
          corrects: [...state.corrects, currentWord],
        };
      } else if (currentWord !== payloadWord) {
        // if user submitted word is wrong
        //* the way newGueses are set up here are very verbose, needs fixing
        action.payload.letterDispatch({
          type: action.payload.setTrueInCheck,
        });

        setTimeout(() => {
          action.payload.letterDispatch({
            type: action.payload.setFalseInCheck,
          });
        }, 1000);

        if (!state.errors[currentWord]) {
          return {
            ...state,
            errors: {
              ...state.errors,
              [currentWord]: [payloadWord],
            },
          };
        } else {
          if (state.errors[currentWord].includes(payloadWord)) {
            return state;
          } else {
            return {
              ...state,
              errors: {
                ...state.errors,
                [currentWord]: [...state.errors[currentWord], payloadWord],
              },
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

export default function Game({ data }) {
  const [gameState, dispatch] = useReducer(reducer, initialGameState);

  useEffect(() => {
    dispatch({ type: types.initialize, payload: data.storiesJson });
  }, [data.storiesJson]);

  console.log(
    gameState.pageCounter,
    gameState.story.section.length,
    gameState.pageCounter === gameState.story.section.length - 1
  );

  return (
    <Layout>
      <div
        className={`${styles.top_container} ${
          !gameState.story.section[gameState.pageCounter].word
            ? styles.no_word
            : ""
        }`}
      >
        <button
          className={`${styles.prev} ${
            gameState.pageCounter === 0 ? styles.hidden : ""
          }`}
          onClick={() => dispatch({ type: types.prevPage })}
        >
          <GrFormPrevious size={40} /> Prev
        </button>
        <button
          className={`${styles.prev_mobile} ${
            gameState.pageCounter === 0 ? styles.hidden : ""
          }`}
          onClick={() => dispatch({ type: types.prevPage })}
        >
          <GrFormPrevious size={40} />
        </button>
        <Picture
          picture={gameState.story.section[gameState.pageCounter].img}
          sentence={gameState.story.section[gameState.pageCounter].sentence}
        />
        {gameState.pageCounter !== gameState.story.section.length - 1 ? (
          <button
            className={`${styles.next_mobile} ${
              !gameState.story.section[gameState.pageCounter].word ||
              gameState.corrects.includes(
                gameState.story.section[
                  gameState.pageCounter
                ].word.toUpperCase()
              )
                ? ""
                : styles.disabled
            }`}
            onClick={() => dispatch({ type: types.nextPage })}
          >
            <GrFormNext size={40} />
          </button>
        ) : (
          <Link
            className={`${styles.next_mobile} ${
              !gameState.story.section[gameState.pageCounter].word ||
              gameState.corrects.includes(
                gameState.story.section[
                  gameState.pageCounter
                ].word.toUpperCase()
              )
                ? ""
                : styles.disabled
            }`}
            to="/summary"
          >
            <GrFormNext size={40} />
          </Link>
        )}
        {gameState.pageCounter !== gameState.story.section.length - 1 ? (
          <button
            className={`${styles.next} ${
              !gameState.story.section[gameState.pageCounter].word ||
              gameState.corrects.includes(
                gameState.story.section[
                  gameState.pageCounter
                ].word.toUpperCase()
              )
                ? ""
                : styles.disabled
            }`}
            onClick={() => dispatch({ type: types.nextPage })}
          >
            Next <GrFormNext size={40} />
          </button>
        ) : (
          <Link
            className={`${styles.next} ${
              !gameState.story.section[gameState.pageCounter].word ||
              gameState.corrects.includes(
                gameState.story.section[
                  gameState.pageCounter
                ].word.toUpperCase()
              )
                ? ""
                : styles.disabled
            }`}
            to="/summary"
          >
            Next <GrFormNext size={40} />
          </Link>
        )}
      </div>
      <div
        className={`${styles.bottom_container} ${
          !gameState.story.section[gameState.pageCounter].word
            ? styles.no_word
            : ""
        }`}
      >
        {gameState.story.section[gameState.pageCounter].word && (
          <FlashWord
            corrects={gameState.corrects}
            word={gameState.story.section[gameState.pageCounter].word}
          />
        )}
        <Sentence
          sentence={gameState.story.section[gameState.pageCounter].sentence}
        />
        {gameState.story.section[gameState.pageCounter].word && (
          <LetterSelection
            word={gameState.story.section[gameState.pageCounter].word}
            corrects={gameState.corrects}
            dispatchGame={dispatch}
            typesGame={types}
          />
        )}
        <Progress
          counter={gameState.pageCounter}
          array={gameState.story.section}
        />
      </div>
    </Layout>
  );
}

export const query = graphql`
  query ($title: String!) {
    storiesJson(title: { eq: $title }) {
      title
      level
      section {
        img
        sentence
        word
      }
    }
  }
`;
