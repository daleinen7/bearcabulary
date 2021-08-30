import React from "react";
import * as styles from "./hero.module.scss";

export default function Hero() {
  const title = "Bearcabulary".split("").map((char, idx) => {
    return (
      <span className={`${styles.letters} ${styles.tile}`} key={idx}>
        {char}
      </span>
    );
  });
  const blankRow = (
    <div className={styles.row}>
      <div className={`${styles.blank} ${styles.tile}`}></div>
      <div className={`${styles.blank} ${styles.tile}`}></div>
      <div className={`${styles.blank} ${styles.tile}`}></div>
      <div className={`${styles.blank} ${styles.tile}`}></div>
    </div>
  );
  return (
    <section className={styles.hero}>
      <div className={styles.main_logo}>
        {blankRow}
        <h1>{title}</h1>
        {blankRow}
      </div>
    </section>
  );
}
