import React from "react";
import { Link } from "gatsby";
import * as styles from "./Header.module.scss";

export default function Header({ pathname }) {
  return (
    <header className={styles.header}>
      {pathname !== "/" && (
        <h1>
          <Link to="/">Bearcabulary</Link>
        </h1>
      )}
    </header>
  );
}
