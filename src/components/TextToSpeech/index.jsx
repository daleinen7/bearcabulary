import React from "react";
import Speech from "react-speech";

export default function TextToSpeech({ word }) {
  return (
    <>
      <div>Speech</div>
      <Speech text={word} pitch="1.5" rate="0.7" />
    </>
  );
}
