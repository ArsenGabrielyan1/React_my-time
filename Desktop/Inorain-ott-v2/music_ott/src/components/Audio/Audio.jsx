import React, { memo, useEffect, useState } from "react";

const PlayAudio = ({
  item,
  handleTimeUpdate = () => {},
  onEnded = () => {},
  setDuration,
  audioRef,
}) => {
  const [srcState, setSrcState] = useState("");

  useEffect(() => {
    if (item) {
      // console.log(item.id);
      // if (item.id == 1) {
      //   setSrcState(
      //     "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3"
      //   );
      // } else {
      //   setSrcState("http://webaudioapi.com/samples/audio-tag/chrono.mp3");
      // }
      setSrcState(item.url);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.src = "";
        setSrcState("");
      }
    };
  }, [item]);

  //   const handleTimeUpdate = () => {
  //     if (audioRef.current) {
  //       setCurrentTime(audioRef.current.currentTime);
  //     }
  //   };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      audioRef?.current?.play();
    }
  };

  const handleSeek = (event) => {
    if (audioRef.current) {
      audioRef.current.currentTime = event.target.value;
    }
  };

  return (
    <audio
      ref={audioRef}
      src={srcState}
      onTimeUpdate={() =>
        handleTimeUpdate(
          audioRef.current.currentTime,
          audioRef.current.duration
        )
      }
      onEnded={onEnded}
      onLoadedMetadata={handleLoadedMetadata}
    ></audio>
  );
};

export default memo(PlayAudio);
