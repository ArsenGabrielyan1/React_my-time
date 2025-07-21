import React, { memo } from "react";
import GImage from "@common/GImage.jsx";
import defaultImage from "@assets/default.png";

function CardMusic({ music, isActive, isHide, isSelected, index }) {
  return (
    <div
      className={`card_music${isActive ? " active" : ""}${
        isHide ? " hide" : ""
      }${isSelected ? " selected" : ""}`}
    >
      <div className="number-music"> {index + 1}</div>
      <div className="image-music-playlist">
        <GImage
          src={music.image}
          className="image_music_playlist"
          placeholder={<img src={defaultImage} className="def_image" />}
        />
      </div>
      <div className="info-music">
        <p className="name_music">{music.name}</p>
        <p className="singer_music">{music.singer}</p>
      </div>
      <div className="selected-music-animation">
        <span></span>
        <span></span>
        <span></span>
        <span> </span>
      </div>
    </div>
  );
}

export default memo(CardMusic);
