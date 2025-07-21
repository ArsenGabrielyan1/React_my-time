import React, { useEffect, useState } from "react";
import { getCategoriesMusic, getRecentlyMusics } from "@server/requests.js";
import Header from "@common/Header.jsx";
import CategoriesMusic from "@components/Music/CategoriesMusic.jsx";
import RecentlyWrapper from "@components/Music/RecentlyWrapper.jsx";

import "@components/styles/Music.scss";

export default function Music() {
  const [control, setControl] = useState("recent"); //recent | categories | back
  const [categories, setCategories] = useState([]);
  const [recentlyList, setRecentlyList] = useState([]);
  const [sideBarOpen, setSideBarOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("hideSidebar music", hideSideBar);
    reqGetCategories();

    return () => {
      window.removeEventListener("hideSidebar music", hideSideBar);
    };
  }, []);

  const hideSideBar = () => {
    setSideBarOpen(false);
  };

  const reqGetCategories = async () => {
    const response = await getCategoriesMusic();
    const resRecently = await getRecentlyMusics();

    const parsedResponse = JSON.parse(response);
    const parsedRecently = JSON.parse(resRecently);

    if (
      parsedResponse &&
      parsedResponse.length > 0 &&
      typeof parsedResponse !== "string"
    ) {
      setCategories([...parsedResponse]);
    } else {
      setCategories([]);
    }

    if (
      parsedRecently &&
      parsedRecently.length > 0 &&
      typeof parsedRecently !== "string"
    ) {
      setRecentlyList(parsedRecently);
    } else {
      if (parsedRecently.length === 0 || typeof parsedRecently === "string")
        setControl("categories");
      setRecentlyList([]);
    }
  };

  return (
    <div className="main-music-page">
      <Header
        hidden={true}
        control={false}
        downCb={() =>
          recentlyList.length ? setControl("recent") : setControl("categories")
        }
      />
      {recentlyList.length > 0 ? (
        <RecentlyWrapper
          setSideBarOpen={setSideBarOpen}
          musics={recentlyList}
          control={!sideBarOpen && control === "recent"}
          downCb={() => (categories.length ? setControl("categories") : null)}
        />
      ) : null}
      {categories.length > 0 ? (
        <CategoriesMusic
          setSideBarOpen={setSideBarOpen}
          categories={categories}
          control={!sideBarOpen && control === "categories"}
          topCb={() =>
            recentlyList.length ? setControl("recent") : setControl("back")
          }
        />
      ) : null}
    </div>
  );
}
