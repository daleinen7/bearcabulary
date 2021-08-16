import React from "react";
import * as styles from "./TextToSpeech.module.scss";
import { FaPlay } from "react-icons/fa";

export default function TextToSpeech({ word }) {
  const utterThis = new SpeechSynthesisUtterance(word);
  utterThis.pitch = 1.5;
  utterThis.rate = 0.7;
  utterThis.voice = window.speechSynthesis.getVoices()[0];

  return (
    <>
      <button
        className={styles.speech_button}
        onClick={() => {
          window.speechSynthesis.cancel();
          window.speechSynthesis.speak(utterThis);
        }}
      >
        <FaPlay />
      </button>
    </>
  );
}
