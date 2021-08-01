import React from "react";
import { Link } from "gatsby";

export default function StoriesList({ stories }) {
  return (
    <ul>
      {stories.map((story, index) => {
        return (
          <li key={index}>
            <Link to={story.parent.name}>{story.title}</Link>
          </li>
        );
      })}
    </ul>
  );
}
