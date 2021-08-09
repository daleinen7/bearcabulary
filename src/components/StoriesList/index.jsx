import React from "react";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import * as styles from "./StoriesList.module.scss";

export default function StoriesList({ stories, images }) {
  // console.log("images", images);
  // console.log("stories", stories);
  return (
    <ul className={styles.stories_list}>
      {stories.map((story, index) => {
        // const image = getImage(images.nodes[0].childImageSharp.fixed);
        const image = images.nodes[0].childImageSharp.fixed;
        console.log("image: ", image);
        return (
          <li key={index}>
            <GatsbyImage image={image} alt={"why"} />
            {/* <img src={story.section[0].img} alt={story.title} /> */}
            <Link to={story.parent.name}>{story.title}</Link>
          </li>
        );
      })}
    </ul>
  );
}
