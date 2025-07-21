import React, { memo } from "react";
import GImage from "@common/GImage.jsx";
import defaultImage from "@assets/default.png";
import { useTranslation } from "react-i18next";

import "../styles/Cards.scss";

function CardCategory({ category, isActive, isHide }) {
  const { t } = useTranslation();

  return (
    <div
      className={`category-item${isActive ? " active" : ""}${
        isHide ? " hide" : ""
      }`}
    >
      <GImage
        src={category?.image}
        className="image_category"
        placeholder={<img src={defaultImage} className="def_image" />}
      />
      <p className="name-category">{t(category.name.toLowerCase())}</p>
    </div>
  );
}

export default memo(CardCategory);
