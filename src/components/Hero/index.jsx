import React from "react";
import useWindowDimensions from "../../utilities/windowResizeUtil";
// import alphabet from "../../utilities/letterSelectionUtil";
import * as styles from "./hero.module.scss";

const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

export default function Hero() {
  const { height, width } = useWindowDimensions();

  const title = "Bearcabulary".split("").map((char, idx) => {
    return (
      <span className={`${styles.letters} ${styles.tile}`} key={idx}>
        {char}
      </span>
    );
  });

  const RandomTile = () => {
    return (
      <div className={`${styles.random} ${styles.tile}`}>
        {alphabet[Math.floor(Math.random() * alphabet.length)]}
      </div>
    );
  };

  const randomRow = (
    <div className={styles.row}>
      {[...Array(4).keys()].map((key) => {
        return <RandomTile key={key} />;
      })}
    </div>
  );

  return (
    <section className={styles.hero}>
      <div className={styles.main_logo}>
        {randomRow}
        <h1>{title}</h1>
        {randomRow}
      </div>
    </section>
  );
}
