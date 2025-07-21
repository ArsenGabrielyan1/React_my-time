import React, { memo, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatTime } from "@utils/formatDate.js";
import { saveRecentlyPlayedRadio } from "@server/requests.js";
import { showSideBar } from "@utils/util.js";
import { useTranslation } from "react-i18next";
import GImage from "@common/GImage.jsx";
// import { ButtonPlayBack } from "./SelectedContent.jsx";
import defaultImage from "@assets/default.png";
import PlaySvg from "@assets/SvgPlay.jsx";
import PauseSvg from "@assets/SvgPause.jsx";
import PrevSvg from "@assets/SvgPrev.jsx";
import NextSvg from "@assets/SvgNext.jsx";
import useKeydown from "@hooks/useKeydown.js";
import PlayAudio from "../Audio/Audio.jsx";

function SelectedContent({
  control,
  setControl,
  item,
  categoryName,
  type = "music",
  count,
  list,
  setSelectedContent,
  setSideBarOpen,
}) {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const refProgress = useRef(null);
  const audioRef = useRef(null);

  const [active, setActive] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const buttons = [
    {
      code: "play_pause",
      icon_play: <PlaySvg />,
      icon_pause: <PauseSvg />,
    },
    {
      code: "prev",
      icon: <PrevSvg />,
    },
    {
      code: "next",
      icon: <NextSvg />,
    },
  ];

  useEffect(() => {
    if (item?.id) {
      setIsPlaying(false);
      reqSaveRecentlyPlayedRadio(item);
    }
  }, [item]);

  const reqSaveRecentlyPlayedRadio = async (item) => {
    if (item?.id) {
      const responce = await saveRecentlyPlayedRadio({ id: item.id });
    }
  };

  const handleTimeUpdate = (current, _duration) => {
    if (Math.floor(current) != 0 && Math.floor(current) !== currentTime) {
      setCurrentTime(Math.floor(current));
      if (_duration !== 0 && _duration !== duration) {
        setDuration(_duration);
      }
      refProgress.current.style.width = (current / _duration) * 100 + "%";
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (!isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handlePrev = () => {
    const currentIndex = list.findIndex((elem) => item.id === elem.id);
    if (currentIndex >= 0) {
      if (currentIndex === 0) {
        setSelectedContent(list[list.length - 1]);
      } else {
        setSelectedContent(list[currentIndex - 1]);
      }
    }
    console.log(currentIndex);
  };
  const handleNext = () => {
    const currentIndex = list.findIndex((elem) => item.id === elem.id);
    if (currentIndex >= 0) {
      if (currentIndex === list.length - 1) {
        setSelectedContent(list[0]);
      } else {
        setSelectedContent(list[currentIndex + 1]);
      }
    }
  };

  const onEnded = () => {
    handleNext();
  };

  useKeydown({
    isActive: control,

    back: () => {
      // history.back();
      navigate(-1);
    },
    up: () => {
      setControl("back");
    },
    down: () => {
      if (list.length) setControl("playlist");
    },
    left: () => {
      if (active === 0) {
        showSideBar("music_c");
        setSideBarOpen(true);
      } else {
        setActive(active - 1);
      }
    },
    right: () => {
      if (active === buttons.length - 1) return;
      setActive(active + 1);
    },

    ok: () => {
      if (active === 0) {
        // play or pause
        togglePlayPause();
      } else if (active === 1) {
        handlePrev();
      } else if (active === 2) {
        handleNext();
      }
    },
  });

  return (
    <div className="selected-content-wrapper">
      <div className="image_content_rm">
        <GImage
          src={item?.image}
          className="image-rm-selected"
          placeholder={<img src={defaultImage} className="def_image" />}
        />
      </div>
      <div className="main-info-content-rm">
        <p className="categoty-name-rm">{t(categoryName.toLowerCase())}</p>
        <p className="name-content-rm">
          {item?.singer ? `${item.singer} - ` : ""} {item?.name}
        </p>
        <p className="desc-content-rm">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla
          molestiae debitis tempora natus quis, id earum officia amet veritatis.
          Tenetur.
        </p>
        <p className="count-content-rm">
          {type === "music" ? t("music") : t("radio")}
          <span className="dot-rm"></span> {count}{" "}
          {type === "music" ? t("songs") : t("channels")}
        </p>
        <div className="progress-field-rm">
          <div className="btns-group-rm">
            {buttons.map((e, i) => {
              return (
                <ButtonPlayBack
                  isPlaying={isPlaying}
                  key={i}
                  isActive={active === i && control}
                  code={e.code}
                  icon_play={e.icon_play}
                  icon_pause={e.icon_pause}
                  icon={e.icon}
                />
              );
            })}
          </div>
          <div className="parent_progress-rm">
            <div className="current-time-rm">
              {formatTime(currentTime, "minute")}{" "}
            </div>
            <div className="progress-rm">
              <div className="progress-bar-rm" ref={refProgress}></div>
            </div>
            <div className="duration-rm">{formatTime(duration, "minute")}</div>
          </div>
        </div>
      </div>
      <PlayAudio
        item={item}
        setDuration={setDuration}
        handleTimeUpdate={handleTimeUpdate}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
        onEnded={onEnded}
      />
    </div>
  );
}

export const ButtonPlayBack = ({
  code,
  icon,
  isActive,
  isPlaying,
  icon_pause,
  icon_play,
}) => {
  return (
    <div className={`button-play-back ${code}${isActive ? " active" : ""}`}>
      {code === "play_pause" ? (isPlaying ? icon_play : icon_pause) : icon}
    </div>
  );
};

export default memo(SelectedContent);
