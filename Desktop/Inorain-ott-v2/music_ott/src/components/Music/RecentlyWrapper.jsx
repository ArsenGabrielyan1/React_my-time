import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { scrollElement, showSideBar } from "@utils/util.js";
import { useTranslation } from "react-i18next";
import CardRecent from "../Cards/CardRecent.jsx";
import useKeydown from "@hooks/useKeydown.js";

export default function RecentlyWrapper({
  control,
  musics = [],
  downCb,
  setSideBarOpen,
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const refList = useRef(null);

  const [active, setActive] = useState(0);

  useKeydown({
    isActive: control,

    down: downCb,

    left: () => {
      if (active === 0) {
        showSideBar("music");
        setSideBarOpen(true);
        return;
      }

      setActive(active - 1);
      scrollElement(refList.current, "X", (active - 1) * -32.4 + "rem", 0.3);
    },

    right: () => {
      if (active === musics.length - 1) return;
      setActive(active + 1);
      scrollElement(refList.current, "X", (active + 1) * -32.4 + "rem", 0.3);
    },

    ok: () => {
      navigate(
        `/category-music?category=recently_played&category_name=Recently Played&m_id=${musics[active].id}`
      );
    },
  });

  return (
    <div className="recently-wrapper">
      <h3>{t("recently played")}</h3>
      <div
        className="list_music_recently"
        ref={refList}
        style={{ width: musics.length * 35 + "rem" }}
      >
        {musics?.map((music, index) => {
          return (
            <CardRecent
              music={music}
              key={index}
              isActive={control && active === index}
              isHide={active > index || active + 4 < index}
            />
          );
        })}
      </div>
    </div>
  );
}
