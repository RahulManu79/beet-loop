/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FollowArtists, UnFollowArtists } from "../../Api/Api";
import noProPic from "../../assets/no-profile-picture-6-1024x1024.jpg";
import "../PlayList/playlist.css";
function ArtistComponent({ artist, following }) {
  const { id } = useSelector((state) => state.userLogin);

  const [follow, setFollow] = useState(false);

  useEffect(() => {
    async function invoke() {
      const followed = following.some((obj) => obj.artist === artist._id);
      setFollow(followed);
    }
    invoke();
  }, [following]);
  const handleFollowing = async (artistId) => {
    const obj = {
      userId: id,
      artistId: artistId,
    };

    const data = await FollowArtists(obj);
    if (data.success === false) {
      console.log("potti");
    } else {
      setFollow(true);
      console.log("susses");
    }
  };
  const handleUnFollowing = async (artistId) => {
    const obj = {
      userId: id,
      artistId: artistId,
    };

    const data = await UnFollowArtists(obj);
    if (data.success === false) {
      console.log("potti");
    } else {
      console.log("susses");
      setFollow(false);
    }
  };
  return (
    <div className="bg-[#111111] w-52 h-64 rounded-lg flex flex-col hover:bg-gradient-to-tr cursor-pointer hover:from-slate-200 transition duration-500 hover:scale-105">
      <div className="bg-[#333333] w-4/5 h-3/6 mt-4 flex justify-center ml-5 items-center">
        <img src={artist.profilepic ? artist.profilepic : noProPic} alt="" />
      </div>
      <div className="p-4 flex flex-col justify-center  content-center gap-4">
        <h1 className="text-white text-lg font-medium">{artist.name}</h1>
        {follow ? (
          <div className="group flex justify-center">
            <button className="bg-[#1FC600] group-hover:hidden px-14 py-1 rounded-lg text-white">
              Following
            </button>
            <button
              className="group-hover:block hidden bg-[#C53030]   px-14 py-1 rounded-lg text-white"
              onClick={() => {
                handleUnFollowing(artist?._id);
              }}
            >
              UnFollow
            </button>
          </div>
        ) : (
          <button
            className=" bg-[#3d5a80] hover:bg-[#98c1d9] px-4 py-1 rounded-lg text-white"
            onClick={() => {
              handleFollowing(artist?._id);
            }}
          >
            Follow
          </button>
        )}
      </div>
    </div>
  );
}

export default ArtistComponent;
