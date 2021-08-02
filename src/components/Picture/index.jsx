import React from "react";
import * as styles from "./Picture.module.scss";

export default function Picture({ picture, sentence }) {
  return (
    <div className={styles.image_container}>
      <img className={styles.image} src={picture} alt={sentence} />
    </div>
  );
}
