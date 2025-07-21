import React, { memo } from "react";
import GImage from "@common/GImage.jsx";

function CardRecent({ music, isActive, isHide }) {
  return (
    <div
      className={`music-item_recently${isActive ? " active" : ""}${
        isHide ? " hide" : ""
      }`}
    >
      <GImage src={music.image} className="image_music_recently" />
      <p className="name_music_recently">{music.name || music.title}</p>
    </div>
  );
}

export default memo(CardRecent);
