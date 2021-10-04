import React from "react";
import * as styles from "./Acknowledgment.module.scss";
import { AiFillLinkedin, AiFillHome } from "react-icons/ai";
import { SiFiverr } from "react-icons/si";

export default function Acknowledgment({ array, acknowledgmentType }) {
  return (
    <div className={styles.acknowledgment_container}>
      <label className={styles.label}>
        {acknowledgmentType}
        {array.length > 1 ? "s" : ""}
      </label>
      <div className={styles.names_container}>
        {array.map((ele1, idx) => {
          return (
            <div key={idx} className={styles.name}>
              {ele1.name}
              {ele1.links.map((link, idx2) => {
                return (
                  <a
                    key={idx2}
                    href={`${link.link}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.type === "LinkedIn" && <AiFillLinkedin />}
                    {link.type === "Fiverr" && <SiFiverr />}
                    {link.type === "Website" && <AiFillHome />}
                  </a>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
