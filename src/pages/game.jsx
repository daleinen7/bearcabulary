import React, { useReducer } from 'react';
import Layout from '../components/Layout';
import Picture from '../components/Picture';
import Sentence from '../components/Sentence';
import Guess from '../components/Guess';
import LetterSelection from '../components/LetterSelection';

const types = {
  nextPage: 'nextPage',
  prevPage: 'prevPage',
  checkWord: 'checkWord',
};

const reducer = (state, action) => {
  switch (action.type) {
    case types.nextPage: // increments counter in gameState
      if (
        !state.story.section[state.pageCounter].word ||
        state.corrects.includes(state.story.section[state.pageCounter].word)
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
      const payloadWord = action.payload.join('').toLowerCase(); // word submitted by user
      const currentWord = state.story.section[state.pageCounter].word; // current word in the word bank

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

const initialGameState = {
  pageCounter: 0, // the counter to keep track of which page the game is currently at
  corrects: [], // keeps track of words the user have gotten right
  errors: [], // keeps track of words the user have gotten wrong
  guesses: [],
  story: {
    title: 'Testing Title',
    level: 3,
    section: [
      {
        img: 'https://res.cloudinary.com/dsfqk4cg8/image/upload/v1621440084/Group_347_phosos.svg',
        sentence:
          'Oh no, Brian ran away! Now Bobby the Bear needs to find clues to find his friend!',
        word: null,
      },
      {
        img: 'https://res.cloudinary.com/dsfqk4cg8/image/upload/v1621440082/Group_348_uhtdhu.svg',
        sentence: 'Brian the bunny is very _____ in size and hard to find!',
        word: 'test',
      },
      {
        img: 'https://res.cloudinary.com/dsfqk4cg8/image/upload/v1621383752/hugo-211_btmjoj.svg',
        sentence: 'Brian likes ____ places and went to the desert.',
        word: 'fest',
      },
    ],
  },
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
      <Guess
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
