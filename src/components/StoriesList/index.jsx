import React from "react";
import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import Arrow from "../Arrow";
import * as styles from "./StoriesList.module.scss";

export default function StoriesList({ stories, images }) {
  console.log("images", images);
  return (
    <section className={styles.stories}>
      <Arrow color={"white"} />
      <ul className={styles.stories_list}>
        {stories.map((story, index) => {
          // find element in the images array that has the first image of the story being mapped over
          const image = images.find((ele) => {
            return ele.relativePath === story.title_card?.slice(5);
          });
          return (
            <li key={index}>
              <Link to={story.parent.name}>
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
                    <div className={styles.led_container}>
                      <div className={styles.led}></div>
                      <div className={styles.led}></div>
                      <div className={styles.led}></div>
                    </div>
                    <div className={styles.vent}></div>
                    <div className={styles.vent}></div>
                    <div className={styles.vent}></div>
                  </div>
                </div>
                <div className={styles.title}>{story.title}</div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
