import React from "react";
import { Link } from "gatsby";
import * as styles from "./Header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <h1>
        <Link to="/">Bearcabulary</Link>
      </h1>
    </header>
  );
}
