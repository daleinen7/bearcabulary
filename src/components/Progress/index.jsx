import React from "react";
import * as styles from "./Progress.module.scss";
// import { GiBearFace } from "react-icons/gi";
import { RiBearSmileFill } from "react-icons/ri";
import { FaPaw } from "react-icons/fa";

export default function Progress({ counter, array }) {
  return (
    <div className={styles.progress_bar}>
      {array.map((element, index) => {
        console.log(index);
        return (
          <div
            key={index}
            className={`${styles.progress} ${
              index === counter ? styles.current : ""
            }
            ${index < counter ? styles.before : ""}`}
          >
            <FaPaw />
          </div>
        );
      })}
    </div>
  );
}
