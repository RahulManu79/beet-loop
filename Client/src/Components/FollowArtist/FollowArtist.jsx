import React, { useEffect, useState } from "react";
import Header from "../Header/Userheader";
import SidebarMain from "../SideBar/SidebarMain";
import { getArtist, isFollowing } from "../../Api/Api";
import ArtistComponent from "./artistComponent";
import { useSelector } from "react-redux";
function FollowArtist() {
  const { id } = useSelector((state) => state.userLogin);
  const [artist, setArtist] = useState([]);
  const [response, setResponse] = useState([]);

  useEffect(() => {
    async function invoke() {
      const data = await getArtist();
      const res = await isFollowing(id);
      setResponse(res.following);
      if (data.success === false) {
        console.log("potti");
      } else {
        setArtist(data.artists);
      }
    }
    invoke();
  }, [artist]);

  return (
    <>
      <div className="bg-[#0F1F32] flex mb-44">
        <div className="">
          <SidebarMain />
        </div>
        <div className=" w-full h-screen flex flex-col">
          <div>
            <div className=" w-full h-20 ">
              <Header />
            </div>
            <div className="w-full h-screen  p-5 bg-[#132335] overflow-scroll scrollbar-hide">
              <div className="text-white text-lg font-semibold">Artists</div>
              <div className="flex gap-4 gap-x-3 flex-wrap w-full h-96  mt-2 justify-center mb-32">
                {artist.map((artist) => (
                  <ArtistComponent
                    key={artist._id}
                    artist={artist}
                    following={response}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FollowArtist;
