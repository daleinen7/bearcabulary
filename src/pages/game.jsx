import React, { useReducer, useEffect } from 'react';
import Layout from '../components/Layout';
import Picture from '../components/Picture';
import Sentence from '../components/Sentence';
import Guess from '../components/Guess';
import LetterSelection from '../components/LetterSelection';

const types = {
  nextPage: 'nextPage',
  prevPage: 'prevPage',
};

const reducer = (state, action) => {
  switch (action.type) {
    case types.nextPage: // to increment counter in gameState
      return { ...state, pageCount: state.pageCount + 1 };
    case types.prevPage: // to decrement counter in gameState
      return {
        ...state,
        pageCount: state.pageCount === 0 ? 0 : state.pageCount - 1,
      };
  }
};

const initialGameState = {
  pageCount: 0, // the counter to keep track of which page the game is currently at
  errors: [], // an array to keep track of words the user got wrong
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
        word: 'Small',
      },
      {
        img: 'https://res.cloudinary.com/dsfqk4cg8/image/upload/v1621383752/hugo-211_btmjoj.svg',
        sentence: 'Brian likes ____ places and went to the desert.',
        word: 'Warm',
      },
    ],
  },
};

export default function Game() {
  const [gameState, dispatch] = useReducer(reducer, initialGameState);

  return (
    <Layout>
      <div>{gameState.page}</div>
      <button onClick={() => dispatch({ type: types.prevPage })}>-</button>
      <button onClick={() => dispatch({ type: types.nextPage })}>+</button>
      <Picture picture={gameState.story.section[gameState.pageCount].img} />
      <Sentence
        word={gameState.story.section[gameState.pageCount].word}
        sentence={gameState.story.section[gameState.pageCount].sentence}
      />
      <Guess />
      <LetterSelection
        word={gameState.story.section[gameState.pageCount].word}
      />
    </Layout>
  );
}
