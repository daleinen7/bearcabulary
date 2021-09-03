import React, { useState, useEffect } from "react";
import useWindowDimensions from "../../utilities/windowResizeUtil";
import * as styles from "./hero.module.scss";
import { alphabet } from "../../utilities/letterSelectionUtil";

export default function Hero() {
  const [columns, setColumns] = useState(16);
  const { width } = useWindowDimensions();

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

  useEffect(() => {
    // Logic for responsive random tiles to the side
    setColumns(
      Math.floor(
        // Width of screen minus width of logo split into two divided by 68px (width of individual boxes)
        Math.min(10000, Math.max(0, Math.floor((width - 272) / 2 / 68) + 8))
      )
    );
  });

  const gridNum = [];
  for (let i = 0; i < columns * 5; i++) {
    gridNum.push(i);
  }

  const RandomGrid = ({ left }) => (
    <div
      className={styles.grid}
      style={{
        width: `${columns * 68 + 80}px`,
        justifyContent: left ? "flex-end" : "",
      }}
    >
      {gridNum.map((_, key) => {
        return <RandomTile key={key} />;
      })}
    </div>
  );

  return (
    <section className={styles.hero}>
      <div
        className={styles.grid_container}
        style={{ width: `${width + 136}px` }}
      >
        {<RandomGrid left={true} />}
        <div className={styles.main_logo}>
          {randomRow}
          <h1>{title}</h1>
          {randomRow}
        </div>
        {<RandomGrid left={false} />}
      </div>
    </section>
  );
}
