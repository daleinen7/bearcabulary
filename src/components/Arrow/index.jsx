import React from "react";
import * as styles from "./Arrow.module.scss";

export default function Arrow({ color }) {
  return <div className={`${styles.arrow} ${styles[color]}`}></div>;
}
