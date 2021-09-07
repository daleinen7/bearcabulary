import React from "react";
import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import Arrow from "../Arrow";
import * as styles from "./StoriesList.module.scss";

export default function StoriesList({ stories, images }) {
  return (
    <section className={styles.stories}>
      <Arrow color={"white"} />
      <ul className={styles.stories_list}>
        {stories.map((story, index) => {
          // find element in the images array that has the first image of the story being mapped over
          const image = images.find((ele) => {
            return ele.relativePath === story.section[0].media?.slice(5);
          });
          return (
            <li key={index}>
              <div className={styles.screen_and_controls}>
                <div className={styles.screenContainer}>
                  <GatsbyImage
                    className={styles.gatsby_wrapper}
                    image={image?.childrenImageSharp[0].gatsbyImageData}
                    alt={story.title}
                  />
                  <div className={styles.screen}></div>
                </div>
                <div className={styles.controls}>
                  <div className={styles.dial}></div>
                  <div className={styles.dial}></div>
                  <div className={styles.vent}></div>
                  <div className={styles.vent}></div>
                  <div className={styles.vent}></div>
                  <div className={styles.vent}></div>
                </div>
              </div>
              <Link to={story.parent.name}>{story.title}</Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
