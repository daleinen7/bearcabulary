import React from "react";
import * as styles from "./Picture.module.scss";

export default function Picture({ picture, sentence }) {
  return <img className={styles.image} src={picture} alt={sentence} />;
}
