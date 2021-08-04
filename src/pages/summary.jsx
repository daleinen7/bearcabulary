import React from "react";
import { Link } from "gatsby";

export default function Summary({ location }) {
  console.log(location);
  return (
    <>
      {location.state.corrects.map((word, index) => {
        return (
          <div key={index}>
            {word}{" "}
            {location.state.errors[word]?.map((error, index2) => {
              return <div key={index2}>{error}</div>;
            })}
          </div>
        );
      })}
      <div>Summary</div>
      <Link to="/">Go to Home</Link>
    </>
  );
}
