import React from "react";
import { Link } from "gatsby";

export default function Summary({ location }) {
  if (!location.state) {
    return <div>You seem lost.</div>;
  } else {
    return (
      <>
        {location.state.corrects.map((word, index) => {
          return (
            <ul key={index}>
              {word}{" "}
              {location.state.errors[word]?.map((error, index2) => {
                return <li key={index2}>{error}</li>;
              })}
            </ul>
          );
        })}
        <div>Summary</div>
        <Link to="/">Go to Home</Link>
      </>
    );
  }
}