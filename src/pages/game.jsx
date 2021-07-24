import React from 'react';
import Layout from '../components/Layout';
import Picture from '../components/Picture';
import Sentence from '../components/Sentence';
import Guess from '../components/Guess';
import LetterSelection from '../components/LetterSelection';

export default function Game() {
  return (
    <Layout>
      <Picture />
      <Sentence />
      <Guess />
      <LetterSelection />
    </Layout>
  );
}
