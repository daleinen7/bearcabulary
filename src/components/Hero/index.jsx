import React from "react";
import useWindowDimensions from "../../utilities/windowResizeUtil";
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

  const randomGrid = (
    <div
      className={styles.grid}
      style={{ width: Math.floor((width - 272) / 2 / 68) * 68 }}
    >
      {[...Array(Math.floor((width - 272) / 2 / 68) * 5).keys()].map((key) => {
        return <RandomTile key={key} />;
      })}
    </div>
  );

  console.log(width);

  console.log("Caluclate array length", Math.floor((width - 272) / 2 / 68) * 5);

  return (
    <section className={styles.hero}>
      {randomGrid}
      <div className={styles.main_logo}>
        {randomRow}
        <h1>{title}</h1>
        {randomRow}
      </div>
      {randomGrid}
    </section>
  );
}
