import React from "react";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import * as styles from "./StoriesList.module.scss";

export default function StoriesList({ stories, images }) {
  return (
    <ul className={styles.stories_list}>
      {stories.map((story, index) => {
        console.log(images);
        return (
          <li key={index}>
            {/* <img src={story.section[0].img} alt={story.title} /> */}
            <GatsbyImage
              image={images[0].childrenImageSharp[0].gatsbyImageData}
              alt={story.title}
            />
            <Link to={story.parent.name}>{story.title}</Link>
          </li>
        );
      })}
    </ul>
  );
}
