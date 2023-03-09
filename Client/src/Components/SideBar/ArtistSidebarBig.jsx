import React from "react";
import logo from "../../assets/png.png";
import DashboardIcon from "@mui/icons-material/Dashboard";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import AlbumIcon from "@mui/icons-material/Album";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DownloadIcon from "@mui/icons-material/Download";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { Link } from "react-router-dom";
// eslint-disable-next-line react/prop-types
function ArtistSidebar({ setIsOpen }) {
  return (
    <>
      <div
        onMouseLeave={() => {
          setIsOpen(false);
        }}
        className="bg-[#152537]  w-64 h-screen rounded-xl"
      >
        <div>
          <img src={logo} alt="" />
        </div>
        <Link>
          <div className="mt-10 ml-3">
            <div className="flex justify-around">
              <DashboardIcon sx={{ color: "white" }} />
              <p className="text-white mr-32">Discover</p>
            </div>
          </div>
        </Link>
        <Link className="mt-10 ml-3">
          <div className="flex justify-around">
            <KeyboardVoiceIcon sx={{ color: "white" }} />
            <p className="text-white mr-32">Artists</p>
          </div>
        </Link>
        <Link className="mt-10 ml-3">
          <div className="flex justify-around">
            <AlbumIcon sx={{ color: "white" }} />
            <p className="text-white mr-32">Albums</p>
          </div>
        </Link>
        <Link className="mt-10 ml-3 " to="/artist/music">
          <div className="flex justify-around">
            <LibraryMusicIcon sx={{ color: "white" }} />
            <p className="text-white mr-32">Musics</p>
          </div>
        </Link>
        <Link className="mt-10 ml-3" to="/artist/addmusic">
          <div className="flex justify-around">
            <LibraryAddIcon sx={{ color: "white" }} />
            <p className="text-white mr-32">Add Musics</p>
          </div>
        </Link>
        <Link className="mt-10 ml-3">
          <div className="flex justify-around">
            <FavoriteIcon sx={{ color: "white" }} />
            <p className="text-white mr-32">Favourites</p>
          </div>
        </Link>
        <Link className="mt-10 ml-3">
          <div className="flex justify-around">
            <QueueMusicIcon sx={{ color: "white" }} />
            <p className="text-white mr-32">PlayList</p>
          </div>
        </Link>
        <Link className="mt-10 ml-3">
          <div className="flex justify-around">
            <DownloadIcon sx={{ color: "white" }} />
            <p className="text-white mr-32">Downloads</p>
          </div>
        </Link>
      </div>
    </>
  );
}

export default ArtistSidebar;
