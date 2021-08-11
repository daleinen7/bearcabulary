import React from "react";
import { Link } from "gatsby";
import * as styles from "./Header.module.scss";
import { FaVolumeUp } from "react-icons/fa";
import { FaVolumeMute } from "react-icons/fa";

export default function Header({ audio, setAudio }) {
  return (
    <header className={styles.header}>
      <h1>
        <Link to="/">Bearcabulary</Link>
      </h1>
      {audio ? (
        <button onClick={() => setAudio(false)}>
          <FaVolumeUp style={{ color: "white" }} />
        </button>
      ) : (
        <button onClick={() => setAudio(true)}>
          <FaVolumeMute style={{ color: "#0f45c3" }} />
        </button>
      )}
    </header>
  );
}
