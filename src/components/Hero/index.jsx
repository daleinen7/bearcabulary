import React from "react";
import * as styles from "./hero.module.scss";
import banner from "./banner.svg";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <img
        src={banner}
        className={styles.banner}
        alt="Bearcabulary is a journey"
      />
      <p>
        Bearcabulary offers games for kindergarten through 3rd grade students.
        Each story incorporates interactive spelling challenges and fun quizzes
        for your child to have an educational adventure!
      </p>
      <p>
        All stories were custom built with the supplied CMS. Find us on{" "}
        <a href="https://github.com/daleinen7/bearcabulary">Github</a> for more
        details. Select a story below to see Bearcabulary in action!
      </p>
    </section>
  );
}
