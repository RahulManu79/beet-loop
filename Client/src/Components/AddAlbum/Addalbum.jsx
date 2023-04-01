import { AppBar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Userdownbar from "../DownBar/Userdownbar";
import Artistheader from "../Header/Artistheader";
import ArtistSidebarMain from "../SideBar/ArtistSidebar";
import "./Album.css";
import EditIcon from "@mui/icons-material/Edit";
import { getArtistSong } from "../../Api/Api";
function AddAlbum() {
  const { name, id } = useSelector((state) => state.artistLogin);
  const [albumName, setAlbumName] = useState("");
  const [songs, setSongs] = useState([]);
  useEffect(() => {
    async function invoke() {
      const data = await getArtistSong(id);
      if (data.success === false) {
        console.log("potti");
      } else {
        setSongs(data.data);
      }
    }
    invoke();
  }, []);
  console.log(songs);
  return (
    <div className="bg-[#0F1F32] flex">
      <div className="fixed">
        <ArtistSidebarMain />
      </div>
      <div className=" w-full h-screen flex flex-col">
        <div>
          <div className="fixed w-full h-20 ">
            <Artistheader />
          </div>
          <div className="w-full h-screen  bg-[#162536a8] overflow-scroll scrollbar-hide flex flex-col mt-16">
            <div className="f w-full h-72 flex gap-3 justify-start p-20 ml-14  ">
              <div className="bg-[#4B5563] w-48 h-44 p-2 flex justify-center items-center content-center ">
                <div className=" w-full h-32">
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          aria-hidden="true"
                          className="w-10 h-10 mb-3 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          ></path>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className=" w-[60vw] h-48">
                <h1 className="text-white text-lg">Add New Album</h1>
                <h1 className="text-white text-5xl font-bold">
                  <input
                    placeholder="Enter Album Name"
                    type="text"
                    className="bg-transparent text-white border-b-2 border-white  placeholder-white "
                    onChange={(e) => setAlbumName(e.target.value)}
                  />
                  <EditIcon sx={{ color: "white", fontSize: 50 }} />
                </h1>
                <h1 className="text-lg text-white"> {name}</h1>
              </div>
            </div>
          </div>
        </div>
        {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {success}
          </Alert>
        </Snackbar>
        <Snackbar
          open={erropen}
          autoHideDuration={6000}
          onClose={errhandleClose}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        </Snackbar> */}
      </div>
    </div>
  );
}

export default AddAlbum;
