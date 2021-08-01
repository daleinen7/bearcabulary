import React from "react";
import * as styles from "./hero.module.scss";
import { StaticImage } from "gatsby-plugin-image";
import banner from "./banner.svg";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <StaticImage src={banner} alt="Bearcabulary is a journey" />
      <p>
        Bearcabulary offers games for kindergarten through 3rd grade students.
        Each story incorporates interactive spelling challenges and fun quizzes
        for your child to have an educational adventure!
      </p>
      <p>Customize your own story with the with built in admin features.</p>
      <p>Select a story below to see Bearcabulary in action!</p>
    </section>
  );
}
