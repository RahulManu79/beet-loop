import React, { useState, useEffect } from "react";
import { AppBar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { addSongToPlaylist, getCreatedPlaylist, getSongs } from "../../Api/Api";
import Userdownbar from "../DownBar/Userdownbar";
import SidebarMain from "../SideBar/SidebarMain";
import Header from "../Header/Userheader";
("../SideBar/SidebarMain");
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./playlist.css";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { addplaylist } from "../../Api/Api";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Userplaylist() {
  const [song, setsong] = useState([]);
  const [songURL, setSongURL] = useState("");
  const [img, setimgURL] = useState("");
  const navigate = useNavigate();
  const { name, id } = useSelector((state) => state.userLogin);
  const [open, setOpen] = useState(false);
  const [playlist, setPlaylist] = useState("");
  const [Discription, setDiscription] = useState("");
  const [playid, setPlayId] = React.useState("");
  const [erropen, seterrOpen] = React.useState(false);
  const [success, setSuccess] = useState(null);
  const [error, seterror] = useState(null);
  const [addSong, setAddSong] = useState("");
  const snakhandleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const errhandleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    seterrOpen(false);
  };

  useEffect(() => {
    async function invoke() {
      const data = await getSongs();

      if (data.success === false) {
        console.log(data);
        navigate("/login");
      } else {
        setsong(data.song);
        console.log(data.song);
      }
    }
    invoke();
  }, []);

  useEffect(() => {
    async function invoke() {
      const data = await getCreatedPlaylist();
      console.log(data);
      if (data.success === false) {
        console.log(data);
        navigate("/login");
      } else {
        console.log(data);
        setPlaylist(data.data);
      }
    }
    invoke();
  }, []);

  console.log(playlist, "sfs");
  let obj = {
    playid: playid,
    songid: addSong,
    Id: id,
  };
  const handleAddPlayList = async () => {
    if (playid) {
      const data = await addSongToPlaylist(obj);
      if (data.success == true) {
        setOpen(true);
        setSuccess(data.message);
      } else {
        seterrOpen(true);
        seterror(data.message);
      }
    } else {
      seterror("something went wrong");
    }
  };
  console.log(playid, "play id", addSong);
  return (
    <>
      <div className="bg-[#0F1F32] flex  mb-24 ">
        <div className="absolute">
          <SidebarMain />
        </div>
        <div className=" w-full h-screen flex flex-col">
          <div>
            <div className=" w-full h-20 ">
              <Header />
            </div>
            <div className="w-full h-screen  bg-[#162536a8] overflow-scroll scrollbar-hide flex flex-col">
              <div className="f w-full h-72 flex gap-3 justify-start p-20 ml-14 ">
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
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
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
                  <h1 className="text-white text-lg">PlayList</h1>
                  <h1 className="text-white text-6xl font-bold">
                    {playlist[0]?.title}
                  </h1>
                  <h1 className="text-lg text-white"> {name}</h1>
                </div>
              </div>
              <div className=" ml-12 w-full h-full  px- gap-2 flex justify-center p-3 py-">
                <div className="w-11/12  p-5 ">
                  <div className="text-white text-lg font-semibold">
                    Add Songs To Your PlayList
                    <hr />
                  </div>
                  <div className="w-full h-fit px-4 gap-2 flex flex-col py-2 ">
                    {song?.map((song) => (
                      // eslint-disable-next-line react/jsx-key
                      <div
                        key={song?._id}
                        className="px-3 w-full bg-[#152537] shadow-xl rounded-md border border-white h-16 flex justify-between  gap-5 items-center cursor-pointer"
                      >
                        <div
                          className="flex gap-2"
                          onClick={() => (
                            setSongURL(song?.songURL), setimgURL(song?.imgURL)
                          )}
                        >
                          <img
                            src={song?.imgURL}
                            alt=""
                            className="w-10 h-10"
                          />
                          <div>
                            <p>{song?.name}</p>
                          </div>
                          <div>
                            <p>{song?.artist}</p>
                          </div>
                        </div>
                        <div>
                          <button
                            className="bg-primary px-3 py-1 rounded-md text-white "
                            onClick={() => {
                              setAddSong(song?._id),
                                setPlayId(playlist[0]?._id);
                              handleAddPlayList();
                            }}
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Snackbar open={open} autoHideDuration={6000} onClose={snakhandleClose}>
          <Alert
            onClose={snakhandleClose}
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
          <Alert
            onClose={snakhandleClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            {error}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
}

export default Userplaylist;
