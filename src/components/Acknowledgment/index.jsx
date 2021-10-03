import React from "react";
import * as styles from "./Acknowledgment.module.scss";
import { IoLogoLinkedin } from "react-icons/io5";
import { SiFiverr } from "react-icons/si";
import { CgWebsite } from "react-icons/cg";

export default function Acknowledgment({ array, acknowledgmentType }) {
  return (
    <div className={styles.acknowledgment_container}>
      <div className={styles.label}>
        {acknowledgmentType}
        {array.length > 1 ? "s" : ""}
      </div>
      <div className={styles.names_container}>
        {array.map((ele1, idx) => {
          return (
            <div key={idx} className={styles.name_container}>
              <span key={idx} className={styles.name}>
                {ele1.name}
              </span>
              {ele1?.links.map((link, idx2) => {
                return (
                  <a
                    key={idx2}
                    href={`${link.link}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.type === "LinkedIn" && <IoLogoLinkedin />}
                    {link.type === "Fiverr" && <SiFiverr />}
                    {link.type === "Website" && <CgWebsite />}
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
