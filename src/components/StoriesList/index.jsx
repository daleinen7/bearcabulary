import React from "react";
import { Link } from "gatsby";
import * as styles from "./StoriesList.module.scss";

export default function StoriesList({ stories }) {
  console.log(stories);
  return (
    <ul className={styles.stories_list}>
      {stories.map((story, index) => {
        return (
          <li key={index}>
            <img src={story.section[0].img} alt={story.title} />
            <Link to={story.parent.name}>{story.title}</Link>
          </li>
        );
      })}
    </ul>
  );
}
