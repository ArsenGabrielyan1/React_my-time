import React, { useRef, useState } from "react";
import { scrollElement, showSideBar } from "@utils/util.js";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CardCategory from "../Cards/CardCategory.jsx";
import useKeydown from "@hooks/useKeydown.js";

export default function CategoriesMusic({
  control,
  categories,
  topCb,
  setSideBarOpen,
}) {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const refGrid = useRef(null);

  const [active, setActive] = useState(0);

  useKeydown({
    isActive: control,

    up: () => {
      if (active < 5) {
        topCb();
        return;
      } else setActive(active - 5);

      scrollElement(
        refGrid.current,
        "Y",
        Math.floor((active - 5) / 5) * -28 + "rem",
        0.3
      );
    },

    down: () => {
      if (active > categories.length - 6) {
        if (categories.length > 5) {
          setActive(categories.length - 1);
          scrollElement(
            refGrid.current,
            "Y",
            Math.floor((categories.length - 1) / 5) * -28 + "rem",
            0.3
          );
        }
        return;
      } else setActive(active + 5);

      if (categories.length > 5) {
        scrollElement(
          refGrid.current,
          "Y",
          Math.floor((active + 5) / 5) * -28 + "rem",
          0.3
        );
      }
    },

    left: () => {
      if (active % 5 === 0) {
        showSideBar("music");
        setSideBarOpen(true);
        return;
      }

      setActive(active - 1);
    },

    right: () => {
      if ((active + 1) % 5 === 0 || active === categories.length - 1) return;
      setActive(active + 1);
    },
    ok: () => {
      navigate(
        `/category-music?category=${categories[active].id}&category_name=${categories[active].name}`
      );
    },
  });

  return (
    <div className="parent-grid-categories">
      <h3>{t("categories")}</h3>
      <div className="grid-categories" ref={refGrid}>
        {categories.map((elem, index) => {
          return (
            <CardCategory
              key={index}
              category={elem}
              isHide={Math.floor(active / 5) * 5 > index}
              isActive={control && index === active}
            />
          );
        })}
      </div>
    </div>
  );
}
