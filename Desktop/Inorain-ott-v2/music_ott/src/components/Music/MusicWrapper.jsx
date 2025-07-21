import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getRecentlyMusics, getMusicByCategory } from "@server/requests.js";

import Header from "@common/Header.jsx";
import SelectedContent from "./SelectedContent.jsx";
import Playlist from "./Playlist.jsx";

export default function MusicWrapper() {
  let [searchParams, setSearchParams] = useSearchParams();

  const [selectedMusic, setSelectedMusic] = useState(null);
  const [musicList, setMusicList] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [control, setControl] = useState("btns"); // back | btns | playlist
  const [sideBarOpen, setSideBarOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("hideSidebar music_c", hideSideBar);

    const category = searchParams.get("category");
    const music_id = searchParams.get("m_id");
    const category_name = searchParams.get("category_name");

    if (!category && !music_id) return;

    if (category === "recently_played") {
      getRecentlyList(music_id);
    } else {
      reqGetMusicByCategory(category);
    }

    setCategoryName(category_name);

    // setTimeout(() => {
    //   setSearchParams({ q: "react router", lang: "fr" });
    // }, 3000);

    return () => {
      window.removeEventListener("hideSidebar music_c", hideSideBar);
    };
  }, []);

  const hideSideBar = () => {
    setSideBarOpen(false);
  };

  const getRecentlyList = async (selected_id) => {
    const response = await getRecentlyMusics();
    const resRecently = await JSON.parse(response);

    if (resRecently && resRecently.length > 0) {
      let selected_music = resRecently.find((music) => music.id == selected_id);
      setSelectedMusic(selected_music);
      setMusicList(resRecently);
    } else {
      setMusicList([]);
    }
  };

  const reqGetMusicByCategory = async (id) => {
    const response = await getMusicByCategory(id);
    const resMusic = await JSON.parse(response);

    if (resMusic && resMusic.length > 0) {
      setSelectedMusic(resMusic[0]);
      setMusicList(resMusic);
    } else {
      setMusicList([]);
    }
  };

  return (
    <div className="music-wrapper">
      <Header
        setSideBarOpen={setSideBarOpen}
        control={!sideBarOpen && control === "back"}
        downCb={() => setControl("btns")}
      />
      <SelectedContent
        setSideBarOpen={setSideBarOpen}
        list={musicList}
        setControl={setControl}
        control={!sideBarOpen && control === "btns"}
        item={selectedMusic}
        setSelectedContent={setSelectedMusic}
        categoryName={categoryName}
        count={musicList?.length}
      />
      <Playlist
        setSideBarOpen={setSideBarOpen}
        list={musicList}
        control={!sideBarOpen && control === "playlist"}
        setControl={setControl}
        selectedMusic={selectedMusic}
        setSelectedMusic={setSelectedMusic}
      />
    </div>
  );
}
