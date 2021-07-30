import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/Layout';
import '../styles/style.scss';

export default function Index() {
  return (
    <Layout>
      <h2>This is the landing page</h2>
      <Link to="/game/">Start Game</Link>
    </Layout>
  );
}
