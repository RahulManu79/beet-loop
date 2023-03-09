import React, { useState, useEffect } from "react";
import { AppBar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getSongs } from "../../Api/Api";
import Userdownbar from "../DownBar/Userdownbar";
import Artistheader from "../Header/Artistheader";
import ArtistSidebarMain from "../SideBar/ArtistSidebar";
import "./css.css";
function Artistmusic() {
  const [song, setsong] = useState([]);
  const [songURL, setSongURL] = useState("");
  const [img, setimgURL] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    async function invoke() {
      const data = await getSongs();

      if (data.success === false) {
        navigate("/login");
      } else {
        setsong(data.song);
        console.log(data.song);
      }
    }
    invoke();
  }, []);
  console.log(songURL, img);
  return (
    <div className="bg-[#0F1F32] flex">
      <div className="absolute">
        <ArtistSidebarMain />
      </div>
      <div className=" w-full h-screen flex flex-col">
        <div>
          <div className=" w-full h-20 ">
            <Artistheader />
          </div>
          <div className="w-full h-screen px-48 overflow-scroll scrollbar-hide">
            <div className=" w-full h-20">
              <h1 className="text-white font-bold text-2xl text-center">
                All Musics <hr />
              </h1>
            </div>

            <div className="w-full h-fit px-4 gap-2 flex flex-col py-2 ">
              {song?.map((song) => (
                // eslint-disable-next-line react/jsx-key
                <div
                  key={song?._id}
                  className="px-3 w-full bg-[#152537] shadow-xl rounded-md border border-white h-16 flex  gap-5 items-center cursor-pointer"
                  onClick={() => (
                    setSongURL(song?.songURL), setimgURL(song?.imgURL)
                  )}
                >
                  <img src={song?.imgURL} alt="" className="w-10 h-10" />
                  <div>
                    <p>{song?.name}</p>
                  </div>
                  <div>
                    <p>{song?.artist}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <AppBar
            position="fixed"
            color="transparent"
            sx={{ top: "auto", bottom: 0, height: 95 }}
          >
            <Userdownbar songURL={songURL} image={img} />
          </AppBar>
        </div>
      </div>
    </div>
  );
}

export default Artistmusic;
