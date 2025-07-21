import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "@components/styles/SplashScreen.scss";
import Loading from "@components/Loading";

export default function SplashScreen() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/music");
    }, 2000);
  }, []);
  return <Loading />;
}
