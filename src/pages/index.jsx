import React from "react";
import { Link } from "gatsby";

export default function Index() {
  return (
    <>
      <h2>This is the landing page</h2>
      <Link to="/game/">Start Game</Link>
    </>
  );
}
