import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import * as styles from "./About.module.scss";
import Arrow from "../Arrow";
const aboutImages = [
  [
    "group_349_yhyt43.png",
    "A game for all the youngin's",
    "Bearcabulary offers games for kindergarten through 3rd grade students. Each story incorporates interactive spelling challenges and fun quizzes for your child to have an educational adventure!",
  ],
  [
    "hugo-211_1_po6rgv.png",
    "Award-winning humble beginnings",
    "Bearcabulary started as a three-day Hackathon built with a team of nine: 4 developers, 4 designers, and 1 data scientist. The team received 1st place for Judges’ Choice Award, and also selected as the People’s Choice Awards.",
  ],
  [
    "group_352_eqamuy.png",
    "Expandable and open-source",
    "Taken from what the team started, we turned it into a more concise and polished product utilizing Gatsby and NetlifyCMS.",
    "https://github.com/daleinen7/bearcabulary",
  ],
];

export default function About({ images }) {
  return (
    <div className={styles.about}>
      <Arrow color={"grey"} />
      <section className={styles.container}>
        {aboutImages.map((aboutEle, idx) => {
          const image = images.find((ele) => {
            return ele.relativePath === aboutEle[0];
          });
          return (
            <div key={idx} className={styles.section}>
              <GatsbyImage
                className={styles.gatsby_wrapper}
                image={image.childrenImageSharp[0].gatsbyImageData}
              ></GatsbyImage>
              <div className={styles.text_container}>
                <h2>{aboutEle[1]}</h2>
                <p>{aboutEle[2]}</p>
                {aboutEle[3] && (
                  <p>
                    Check it out on{" "}
                    <a href={`${aboutEle[3]}`} target="_blank" rel="noreferrer">
                      GitHub
                    </a>
                    .
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
