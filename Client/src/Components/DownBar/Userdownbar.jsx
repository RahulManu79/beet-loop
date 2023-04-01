/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./Downbar.css";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import music1 from "../../assets/Sickick_-_Talking_to_the_Moon_(Bruno_Mars_Remix)(256k).mp3";
import music2 from "../../assets/Yedho_Ondru_-_Amos_Paul(256k).mp3";
import music3 from "../../assets/Da_Da_Da_(Remix_by_Mikis)(256k).mp3";
import { Avatar } from "@mui/material";

// eslint-disable-next-line react/prop-types
function Userdownbar({ songURL, img, song }) {
  console.log(song, "hfdu");
  let arr = [music1, music2, music3];

  return (
    <div
      style={{ width: "-webkit-fill-available" }}
      className="main  flex relative"
    >
      <div className="f w-80 h-24 ">
        <div className=" w-full h-24 ml-2 flex">
          <Avatar sx={{ width: "100px", height: "100px" }} src={img} />
          <div className=" w-96 h-24 flex flex-col gap-2 ">
            <h1 className="text-white text-2xl font-medium mt-3 ml-4">
              {song.name}
            </h1>
            <h2 className="text-white text-base font-light ml-4">
              {song.artist}
            </h2>
          </div>
        </div>
      </div>
      <div className="w-3/4">
        <AudioPlayer
          src={songURL}
          onPlay={() => console.log("play")}
          // other props here
        />
      </div>
    </div>
  );
}

export default Userdownbar;
