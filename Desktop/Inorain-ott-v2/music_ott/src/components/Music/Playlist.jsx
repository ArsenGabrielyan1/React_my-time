import React, { memo, useRef, useState } from "react";
import { showSideBar } from "@utils/util.js";
import { useNavigate } from "react-router-dom";
import { scrollElement } from "@utils/util.js";

import CardMusic from "@components/Cards/CardMusic.jsx";

import useKeydown from "@hooks/useKeydown.js";

function Playlist({
  list,
  control,
  setControl,
  selectedMusic,
  setSelectedMusic,
  setSideBarOpen,
}) {
  const navigate = useNavigate();

  const refList = useRef(null);

  const [active, setActive] = useState(0);

  const scrollTo = (position) => {
    if (list.length > 4) {
      // refList.current.
      scrollElement(refList.current, "Y", position + "rem", 0.3);
    }
  };

  useKeydown({
    isActive: control,

    back: () => {
      navigate(-1);
    },
    left: () => {
      showSideBar("music_c");
      setSideBarOpen(true);
    },
    up: () => {
      if (active === 0) {
        setControl("btns");
      } else {
        setActive(active - 1);
        // scroll elelment
        scrollTo((active - 1) * -12.8);
      }
    },
    down: () => {
      if (active === list.length - 1) return;

      setActive(active + 1);
      // scroll elelment
      scrollTo((active + 1) * -12.8);
    },
    ok: () => {
      setSelectedMusic(list[active]);
    },
  });

  return (
    <div className="playlist-wrapper">
      <div className="main-list-musics" ref={refList}>
        {list.map((music, index) => {
          console.log(music);
          return (
            <CardMusic
              isSelected={selectedMusic.id === music.id}
              isActive={control && active === index}
              isHide={active > index && list.length > 4}
              music={music}
              index={index}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
}

export default memo(Playlist);
