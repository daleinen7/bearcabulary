import React from "react";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import * as styles from "./StoriesList.module.scss";

export default function StoriesList({ stories, images }) {
  return (
    <ul className={styles.stories_list}>
      {stories.map((story, index) => {
        // find element in the images array that has the first image of the story being mapped over
        const image = images.find((ele) => {
          return ele.relativePath === story.section[0].media?.slice(5);
        });
        return (
          <li key={index}>
            <GatsbyImage
              image={image?.childrenImageSharp[0]?.gatsbyImageData}
              alt={story.title}
            />
            <Link to={story.parent.name}>{story.title}</Link>
          </li>
        );
      })}
    </ul>
  );
}
