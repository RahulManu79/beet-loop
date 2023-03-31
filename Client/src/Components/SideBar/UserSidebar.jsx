import React from "react";
import logo from "../../assets/png.png";
import DashboardIcon from "@mui/icons-material/Dashboard";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import AlbumIcon from "@mui/icons-material/Album";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import { Link, useNavigate } from "react-router-dom";
import { addplaylist } from "../../Api/Api";
import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
function UserSidebar({ setIsOpen }) {
  const navigate = useNavigate();
  const { id } = useSelector((state) => state.userLogin);

  const createPlaylist = async () => {
    const data = await addplaylist(id);
    if (data.success == true) {
      navigate("/playlist");
    } else {
      alert("error");
    }
  };
  return (
    <>
      <div
        onMouseLeave={() => {
          setIsOpen(false);
        }}
        className="bg-[#152537]  w-64 h-[100vh] rounded-xl"
      >
        <div>
          <img src={logo} alt="" />
        </div>
        <Link to="/">
          <div className="mt-10 ml-3">
            <div className="flex justify-around">
              <DashboardIcon sx={{ color: "white" }} />
              <p className="text-white mr-32">Discover</p>
            </div>
          </div>
        </Link>
        <Link to="/list-artist">
          <div className="mt-10 ml-3">
            <div className="flex justify-around">
              <KeyboardVoiceIcon sx={{ color: "white" }} />
              <p className="text-white mr-32">Artists</p>
            </div>
          </div>
        </Link>
        <Link to="/albums">
          <div className="mt-10 ml-3">
            <div className="flex justify-around">
              <AlbumIcon sx={{ color: "white" }} />
              <p className="text-white mr-32">Albums</p>
            </div>
          </div>
        </Link>

        <Link to="/favorites">
          <div className="mt-10 ml-3">
            <div className="flex justify-around">
              <FavoriteIcon sx={{ color: "white" }} />
              <p className="text-white mr-32">Favorites</p>
            </div>
          </div>
        </Link>
        <Link>
          <div className="mt-10 ml-3" onClick={createPlaylist}>
            <div className="flex justify-around">
              <QueueMusicIcon sx={{ color: "white" }} />
              <p className="text-white mr-28">Create PlayList</p>
            </div>
          </div>
        </Link>
        <Link to="/collection">
          <div className="mt-10 ml-3">
            <div className="flex justify-around">
              <LibraryBooksIcon sx={{ color: "white" }} />
              <p className="text-white mr-32">Your Library</p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}

export default UserSidebar;
