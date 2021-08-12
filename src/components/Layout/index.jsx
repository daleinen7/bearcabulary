import React, { useState } from "react";
import Header from "../Header";
import { audioStateContext } from "../../context/audio-context";
// export const AudioStateContext = createContext(false);

export default function Layout({ children }) {
  const [audio, setAudio] = useState(true);
  return (
    <audioStateContext.Provider value={audio}>
      <Header audio={audio} setAudio={setAudio} />
      {children}
    </audioStateContext.Provider>
  );
}
