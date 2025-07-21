import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "@utils/formatDate.js";
import BackSvg from "@assets/SvgBack.jsx";
import useKeydown from "@hooks/useKeydown";

import "../styles/header.scss";
import { showSideBar } from "@utils/util.js";

let interval = null;

export default function Header({ control, downCb, hidden, setSideBarOpen }) {
  const navigate = useNavigate();

  const [dateTime, setDateTime] = useState(new Date().getTime());

  useEffect(() => {
    // 5 min set new date
    interval = setInterval(() => {
      setDateTime(new Date().getTime());
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useKeydown({
    isActive: !hidden && control,
    down: downCb,
    back: () => {
      navigate(-1);
    },
    left: () => {
      showSideBar("music_c");
      setSideBarOpen(true);
    },
    ok: () => {
      navigate(-1);
    },
  });

  return (
    <div className="header-radio_music">
      <button
        className={`btn_back${control ? " active" : ""}${
          hidden ? " hidden" : ""
        }`}
        onClick={() => downCb()}
      >
        <div className="icon">
          <BackSvg />
        </div>
        <span>Back</span>
      </button>
      <div className="date_time">
        <p>{formatDate(new Date(dateTime), "bbbb, MMM dd hh:mm aaa")}</p>
      </div>
    </div>
  );
}
