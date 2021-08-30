import React from "react";
import * as styles from "./About.module.scss";

export default function About() {
  return (
    <div className={styles.about}>
      <section className={styles.container}>
        <h2>History</h2>
        <p>
          Bearcabulary started as a 3 day Hackathon built with a team of 9 (4
          Developers, 4 Designers, and 1 Data Scientist). The team ended up
          winning 1st place and the people's choice award.
        </p>
        <p>
          Here we've taken what the team started and turned it into a more
          concise and polished product utilizing Gatsby and NetlifyCMS.{" "}
        </p>
      </section>
    </div>
  );
}
