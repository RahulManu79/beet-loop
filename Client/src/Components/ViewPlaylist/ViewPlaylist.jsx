import { AppBar } from "@mui/material";
import React, { useEffect, useState } from "react";
import Userdownbar from "../DownBar/Userdownbar";
import Header from "../Header/Userheader";
import SidebarMain from "../SideBar/SidebarMain";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { useLocation, useNavigate } from "react-router-dom";
import { getViewPlaylist, removeFromPlaylis } from "../../Api/Api";
import { useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function ViewPlaylist() {
  const location = useLocation();
  const { id } = location.state;
  const navigate = useNavigate();
  const { name } = useSelector((state) => state.userLogin);
  const [songURL, setSongURL] = useState("");
  const [img, setimgURL] = useState("");
  const [playlist, setPlaylist] = useState([]);
  const [songs, setSongs] = useState([]);
  const [removeSong, setRemoveSong] = useState("");
  const [erropen, seterrOpen] = React.useState(false);
  const [success, setSuccess] = useState(null);
  const [error, seterror] = useState(null);
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
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
      const data = await getViewPlaylist(id);
      console.log(data);
      if (data.success === false) {
        console.log(data);
        navigate("/login");
      } else {
        console.log(data.data[0].songs, "iohy");
        setPlaylist(data.data);
        setSongs(data.data[0].songs);
      }
    }
    invoke();
  }, [refresh]);

  const obj = {
    playlistId: id,
    songId: removeSong,
  };
  const handlRemovePlayList = async () => {
    if (removeSong) {
      const data = await removeFromPlaylis(obj);
      if (data.success == true) {
        setOpen(true);
        setSuccess(data.message);
        setRefresh(!refresh);
      } else {
        seterrOpen(true);
        seterror(data.message);
      }
    } else {
      alert("something went wrong");
    }
  };
  return (
    <>
      <div className="bg-[#0F1F32]  flex  mb-24 ">
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
                  <div className=" w-full h-32 ml-4">
                    <MusicNoteIcon sx={{ fontSize: 130 }} />
                  </div>
                </div>

                <div className=" w-[60vw] h-48">
                  <h1 className="text-white text-lg">PlayList</h1>
                  <h1 className="text-white text-6xl font-bold">
                    {playlist[0]?.title}
                  </h1>
                  <h1 className="text-lg text-white mt-4">{name}</h1>
                  <div>
                    <button className="bg-primary px-2 py-1 text-white rounded-lg ">
                      Add Songs
                    </button>
                  </div>
                </div>
              </div>
              <div className=" ml-12 w-full h-full  px- gap-2 flex justify-center p-3 py-">
                <div className="w-11/12  p-5 ">
                  <div className="text-white text-lg font-semibold">
                    <div>
                      Add Songs To Your PlayList
                      <hr />
                    </div>
                  </div>
                  <div className="w-full h-fit px-4 gap-2 flex flex-col py-2 ">
                    {songs?.map((song) => (
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
                              setRemoveSong(song?._id), handlRemovePlayList();
                              // setPlayId(playlist[0]?._id);
                            }}
                          >
                            Remove
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

export default ViewPlaylist;
