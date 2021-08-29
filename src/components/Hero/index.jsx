import React from "react";
import * as styles from "./hero.module.scss";

export default function Hero() {
  const title = "Bearcabulary".split("").map((char) => {
    return <span className={styles.letters}>{char}</span>;
  });
  return (
    <section>
      <h1>{title}</h1>
    </section>
  );
}
