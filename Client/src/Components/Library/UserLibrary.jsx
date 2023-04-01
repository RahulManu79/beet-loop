import React, { useEffect, useState } from "react";
import Header from "../Header/Userheader";
import SidebarMain from "../SideBar/SidebarMain";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { getPlaylist } from "../../Api/Api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function UserLibrary() {
  const [playlist, setPlaylist] = useState([]);
  const { id } = useSelector((state) => state.userLogin);
  const navigate = useNavigate();
  useEffect(() => {
    async function invoke() {
      const playlist = await getPlaylist(id);
      if (playlist.success === false) {
        console.log("potti");
      } else {
        setPlaylist(playlist.data);
      }
    }
    invoke();
  }, []);
  console.log(playlist, ";;;;;");
  return (
    <>
      <div className="bg-[#0F1F32] flex">
        <div className="">
          <SidebarMain />
        </div>
        <div className=" w-full h-screen flex flex-col">
          <div>
            <div className=" w-full h-20 ">
              <Header />
            </div>
            <div className="w-full h-screen  p-5 bg-[#132335] overflow-scroll scrollbar-hide">
              <div className="text-white text-lg font-semibold">Playlists</div>
              <div className="flex gap-4 gap-x-3 flex-wrap  mt-2 justify-center mb-32">
                <div className="like w-[430px] flex flex-col  items-center h-64 rounded-lg p-2  pt-5 ">
                  <div className="flex justify-center items-center text-white  w-11/12 h-3/5">
                    Not Liked Any Songs
                  </div>
                  <div className=" w-11/12 h-2/5 p-3 flex gap-40 ">
                    <div className="flex flex-col gap-1 mt-2">
                      <h1 className="text-white text-xl font-bold">
                        Liked Songs
                      </h1>
                      <h2 className="text-white text-lg font-normal">
                        0 songs Liked
                      </h2>
                    </div>
                    <div className="flex ">
                      <PlayCircleFilledIcon
                        sx={{ color: "limegreen", fontSize: 70 }}
                      />
                    </div>
                  </div>
                </div>
                {playlist.map((playlist) => (
                  <div
                    key={playlist?._id}
                    className="bg-[#111111] w-52 h-64 rounded-lg flex flex-col hover:bg-gradient-to-tr cursor-pointer hover:from-slate-400 transition duration-500 hover:scale-105"
                    onClick={() =>
                      navigate("/playlist-view", {
                        state: { id: playlist._id },
                      })
                    }
                  >
                    <div className="bg-[#333333] w-4/5 h-4/6 mt-4 flex justify-center ml-5 items-center">
                      <MusicNoteIcon sx={{ fontSize: 100 }} />
                    </div>
                    <div className="ml-5 mt-2">
                      <h1 className="text-white text-lg font-medium">
                        {playlist?.title}
                      </h1>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserLibrary;
