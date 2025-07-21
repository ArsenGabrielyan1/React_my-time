import React, { memo, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import("shell/i18n");
import i18n from "shell/i18n";

import SplashScreen from "@components/pages/SplashScreen.jsx";
import Music from "@components/pages/Music.jsx";
import MusicWrapper from "@components/Music/MusicWrapper.jsx";

function App() {
  useEffect(() => {
    let token = new URLSearchParams(window.location.search).get("token");
    window.addEventListener("languageChanged", setLanguage);

    if (token) {
      localStorage.setItem("token", token);
    }

    setLanguage();

    function setLanguage() {
      try {
        const language = JSON.parse(localStorage.getItem("language") || "{}");

        //@ts-ignore
        i18n.changeLanguage(language.iso_code || "en");
      } catch (e) {
        console.log(e);
      }
    }

    return () => {
      window.removeEventListener("languageChanged", setLanguage);
    };
  }, []);
  return (
    <div className="music-wrapper">
      <Routes>
        <Route path={"/"} exact element={<SplashScreen />} />
        <Route path={"/music"} exact element={<Music />} />
        <Route path={"/category-music"} exact element={<MusicWrapper />} />
      </Routes>
    </div>
  );
}

export default memo(App);
