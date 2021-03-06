import React from "react";
import * as styles from "./Picture.module.scss";
import { GatsbyImage } from "gatsby-plugin-image";

export default function Picture({ picture, sentence, image }) {
  return (
    <div className={styles.image_container}>
      <GatsbyImage image={image} className={styles.image} alt={sentence} />
    </div>
  );
}
