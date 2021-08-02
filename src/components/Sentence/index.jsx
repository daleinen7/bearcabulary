import React from "react";
import * as styles from "./Sentence.module.scss";

export default function Sentence({ sentence }) {
  return <p className={styles.sentence}>{sentence}</p>;
}
