import React from "react";
import { Outlet } from "react-router-dom";
import { NavigationManager } from "../components/NavigationManager.tsx";
import SplashScreen from "../components/pages/SplashScreen.jsx";
import Music from "../components/pages/Music.jsx";
import MusicWrapper from "../components/Music/MusicWrapper.jsx";
//  <Route path={"/"} exact element={<SplashScreen />} />
//         <Route path={"/music"} exact element={<Music />} />
//         <Route path={"/category-music"} exact element={<MusicWrapper />} />
export const routes = [
  {
    path: "/",
    element: (
      <NavigationManager>
        {/* <div className="music-wrapper"> */}
          <Outlet />
        {/* </div> */}
      </NavigationManager>
    ),
    children: [
      {
        index: true,
        element: <SplashScreen />,
      },
      {
        path: "music",
        element: <Music />,
      },
      {
        path: "category-music",
        element: <MusicWrapper />,
      },
    ],
  },
];
