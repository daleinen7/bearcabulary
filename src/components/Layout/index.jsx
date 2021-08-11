import React, { useState } from "react";
import Header from "../Header";

export default function Layout({ children }) {
  const [audio, setAudio] = useState(true);
  return (
    <>
      <Header audio={audio} setAudio={setAudio} />
      {children}
    </>
  );
}
