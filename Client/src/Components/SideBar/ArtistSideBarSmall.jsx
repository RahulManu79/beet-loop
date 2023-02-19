import React from "react";
import logo from "../../assets/png.png";
import DashboardIcon from "@mui/icons-material/Dashboard";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import AlbumIcon from "@mui/icons-material/Album";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DownloadIcon from "@mui/icons-material/Download";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import { color } from "@mui/system";
function ArtistSidebarSmall({ setIsOpen }) {
  return (
    <>
      <div
        onMouseEnter={() => {
          setIsOpen(true);
        }}
        className="bg-[#152537]  w-24 h-screen rounded-xl"
      >
        <div className="">
          <img className="" src={logo} alt="" />
        </div>
        <div className="mt-10 ml-3">
          <div className="flex justify-around">
            <DashboardIcon sx={{ color: "white" }} />
          </div>
        </div>
        <div className="mt-10 ml-3">
          <div className="flex justify-around">
            <KeyboardVoiceIcon sx={{ color: "white" }} />
          </div>
        </div>
        <div className="mt-10 ml-3">
          <div className="flex justify-around">
            <AlbumIcon sx={{ color: "white" }} />
          </div>
        </div>
        <div className="mt-10 ml-3">
          <div className="flex justify-around">
            <LibraryMusicIcon sx={{ color: "white" }} />
          </div>
        </div>
        <div className="mt-10 ml-3">
          <div className="flex justify-around">
            <FavoriteIcon sx={{ color: "white" }} />
          </div>
        </div>
        <div className="mt-10 ml-3">
          <div className="flex justify-around">
            <QueueMusicIcon sx={{ color: "white" }} />
          </div>
        </div>
        <div className="mt-10 ml-3">
          <div className="flex justify-around">
            <DownloadIcon sx={{ color: "white" }} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ArtistSidebarSmall;
