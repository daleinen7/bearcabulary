import React, { useEffect } from "react";
import { Link, navigate } from "gatsby";
import * as styles from "./Summary.module.scss";
import Layout from "../components/Layout";
import SummaryEntry from "../components/SummaryEntry";

export default function Summary({ location }) {
  useEffect(() => {
    if (!location.state || !location.state.corrects) {
      navigate("/");
    }
  }, [location.state]);

  if (!location.state || !location.state.corrects) {
    return null;
  } else {
    return (
      <Layout title="Summary" location={location}>
        <div className={styles.summary_page_container}>
          <div className={styles.summary_page_inner_container}>
            <div className={styles.summary_page_title}>The End.</div>
            <div className={styles.summary_page_description}>
              Here's a quick summary of the words you've spelled and the
              mistakes you've made, if any!
            </div>
            <ul className={styles.entries_container}>
              {location.state?.corrects.map((word, index) => {
                return (
                  <SummaryEntry
                    word={word}
                    key={index}
                    errors={location.state?.errors[word]}
                  />
                );
              })}
            </ul>
            <Link to="/" className={styles.home_button}>
              Home
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
}
