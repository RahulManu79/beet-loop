import React, { useState, useEffect } from "react";
import { AppBar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getSongs } from "../../Api/Api";
import Header from "../Header/Userheader";
import SidebarMain from "../SideBar/SidebarMain";
import SongListComponent from "../Songlist/SongListComponent";

function Userhome() {
  const [song, setsong] = useState([]);
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
  return (
    <>
      <div className="bg-[#0F1F32] flex">
        <div className="absolute">
          <SidebarMain />
        </div>
        <div className=" w-full h-screen flex flex-col">
          <div>
            <div className=" w-full h-20 ">
              <Header />
            </div>
            <div className="w-full h-screen px-48 overflow-scroll scrollbar-hide">
              <div className=" w-full h-20">
                <h1 className="text-white font-bold text-2xl text-center">
                  Latest Songs <hr />
                </h1>
              </div>

              <SongListComponent song={song} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Userhome;
