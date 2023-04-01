/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setImageURL,
  setSongDetails,
  setSongURL,
} from "../../redux/Slice/SongSlice";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { addLike } from "../../Api/Api";
function SongListComponent({ song }) {
  const dispatch = useDispatch();

  const handleplay = async (song, img, songDetails) => {
    dispatch(setSongURL({ songURL: song }));
    dispatch(setImageURL({ img: img }));
    dispatch(setSongDetails({ song: songDetails }));
  };

  console.log(song);

  return (
    <div className="w-full h-fit px-4 gap-2 flex flex-col py-2 ">
      {song?.map((songs) => (
        // eslint-disable-next-line react/jsx-key
        <div
          key={songs?._id}
          className=" p-6 w-full bg-[#152537] shadow-xl rounded-md border border-white h-16 flex justify-between gap-5 items-center cursor-pointer "
          onClick={() => handleplay(songs?.songURL, songs?.imgURL, songs)}
        >
          <img src={songs?.imgURL} alt="" className="w-10 h-10" />
          <div>
            <p>{songs?.name}</p>
          </div>
          <div>
            <p>{songs?.artist}</p>
          </div>
          <Child songId={songs?._id} />
        </div>
      ))}
    </div>
  );
}

export default SongListComponent;

function Child({ songId }) {
  const { id } = useSelector((state) => state.userLogin);

  async function handleClick(event) {
    event.stopPropagation();
    console.log("Clicked child");
    console.log(songId);
    const obj = {
      userId: id,
      songId: songId,
    };
    const res = await addLike(obj);
    if (res.success === false) {
      console.log("potti");
    } else {
      // setArtist(res.artists);
      console.log("LIKED");
    }
  }

  return (
    <button onClick={handleClick}>
      <FavoriteBorderIcon />
    </button>
  );
}
