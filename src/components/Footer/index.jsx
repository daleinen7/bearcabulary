import React from "react";
import * as styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <div className={styles.footer_container}>
      <p>
        Built with Gatsby and NetlifyCMS by{" "}
        <a href="https://dougleinen.com" target="_blank">
          Thor
        </a>{" "}
        and{" "}
        <a href="https://knds.art" target="_blank">
          Kaung
        </a>
        .
      </p>
    </div>
  );
}
