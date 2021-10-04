import React, { useReducer, useEffect, useState } from "react";
import { graphql, Link } from "gatsby";
import * as styles from "./Game.module.scss";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { MdRotateLeft } from "react-icons/md";
import Layout from "../components/Layout";
import Picture from "../components/Picture";
import FlashWord from "../components/FlashWord";
import Sentence from "../components/Sentence";
import LetterSelection from "../components/LetterSelection";
import Progress from "../components/Progress";
import Definition from "../components/Definition";
import Acknowledgment from "../components/Acknowledgment";
import useWindowDimensions from "../utilities/windowResizeUtil";
import { findImage } from "../utilities/imageSelectionUtil";

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
    authors: [],
    artists: [],
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

export default function Game({ data, location }) {
  const [gameState, dispatch] = useReducer(reducer, initialGameState);
  const [stateHeight, setStateHeight] = useState(600);
  const { height } = useWindowDimensions();

  useEffect(() => {
    dispatch({ type: types.initialize, payload: data.storiesJson });
  }, [data.storiesJson]);

  useEffect(() => {
    setStateHeight(height);
  }, [height]);

  return (
    <>
      <Layout title={data.storiesJson.title} location={location}>
        {stateHeight > 575 ? (
          <>
            <div
              className={`${styles.top_container} ${
                !gameState.story.section[gameState.pageCounter].word
                  ? styles.no_word
                  : ""
              } ${gameState.pageCounter === 0 ? styles.first_slide : ""}`}
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
                image={findImage(
                  data.allFile.nodes,
                  data.storiesJson,
                  gameState.pageCounter
                )}
                picture={gameState.story.section[gameState.pageCounter].img}
                sentence={
                  gameState.story.section[gameState.pageCounter].sentence
                }
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
                  state={{
                    corrects: gameState.corrects,
                    errors: gameState.errors,
                  }}
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
                  state={{
                    corrects: gameState.corrects,
                    errors: gameState.errors,
                  }}
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
              } ${gameState.pageCounter === 0 ? styles.first_slide : ""}`}
            >
              {gameState.story.section[gameState.pageCounter].word && (
                <div className={styles.word_container}>
                  <FlashWord
                    corrects={gameState.corrects}
                    word={gameState.story.section[gameState.pageCounter].word}
                  />
                  <Definition
                    word={gameState.story.section[gameState.pageCounter].word}
                    corrects={gameState.corrects}
                  />
                </div>
              )}
              <Sentence
                sentence={
                  gameState.story.section[gameState.pageCounter].sentence
                }
              />
              {gameState.story.section[gameState.pageCounter].word && (
                <LetterSelection
                  word={gameState.story.section[gameState.pageCounter].word}
                  corrects={gameState.corrects}
                  dispatchGame={dispatch}
                  typesGame={types}
                />
              )}
              {gameState.pageCounter === 0 && (
                <div className={styles.acknowledgments_container}>
                  <Acknowledgment
                    array={gameState.story.authors}
                    acknowledgmentType="Author"
                  />
                  <Acknowledgment
                    array={gameState.story.artists}
                    acknowledgmentType="Artist"
                  />
                </div>
              )}
              <Progress
                counter={gameState.pageCounter}
                array={gameState.story.section}
              />
            </div>
          </>
        ) : (
          <div className={styles.warning_message_container}>
            <MdRotateLeft size={40} />
            Please enlarge your window size or rotate your display.
          </div>
        )}
      </Layout>
    </>
  );
}

export const query = graphql`
  query ($title: String!) {
    storiesJson(title: { eq: $title }) {
      title
      level
      authors {
        name
        links {
          link
          type
        }
      }
      artists {
        name
        links {
          link
          type
        }
      }
      section {
        img
        media
        sentence
        word
        definition
      }
    }
    allFile(filter: { sourceInstanceName: { eq: "images" } }) {
      nodes {
        relativePath
        childrenImageSharp {
          gatsbyImageData(width: 3000, placeholder: NONE)
        }
      }
    }
  }
`;
