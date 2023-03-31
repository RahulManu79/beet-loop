import { AppBar } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../Config/firebase.config";
import axios from "axios";
import { getCatagory } from "../../Api/Api";
import { useSelector } from "react-redux";
import Userdownbar from "../DownBar/Userdownbar";
import Artistheader from "../Header/Artistheader";
import ArtistSidebarMain from "../SideBar/ArtistSidebar";
import { useNavigate } from "react-router-dom";
import { Progress } from "../../ui/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function Addmusic() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [img, setImg] = useState();
  const [imgUrl, setImgUrl] = useState("");
  const [audio, setAudio] = useState("");
  const [audioURL, setAudioURL] = useState("");
  const { id, name } = useSelector((state) => state.artistLogin);
  const [Category, setCategory] = useState([]);
  const [value, setvalue] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoding] = useState(false);
  const [loadingAudio, setLodingAudio] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [erropen, seterrOpen] = React.useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setbError] = useState(null);
  const [success, setSuccess] = useState(null);
  const handleClose = (event, reason) => {
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

  const handleAudioUpload = (e) => {
    setAudio(e.target.files[0]);
    if (audio == null) {
      return;
    }
    setLodingAudio(true);

    try {
      const audioref = ref(storage, `/audio/${audio.name}`);
      console.log(audioref, "audioref");
      const uploadtask = uploadBytesResumable(audioref, audio);
      uploadtask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);

          console.log(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadtask.snapshot.ref).then((downloadURL) => {
            console.log(downloadURL);
            setSuccess("song Uploaded successfully");
            setLodingAudio(false);
            setOpen(true);
            setAudioURL(downloadURL);
          });
        }
      );
    } catch (error) {
      seterrOpen(true);
      setbError("Something went wrong in Uploading song , please try again");
    }
  };
  useEffect(() => {
    async function invoke() {
      const data = await getCatagory();
      if (data.status === "failed") {
        navigate("/artist/login");
      } else {
        setCategory(data?.catagory);
      }
    }
    invoke();
  }, []);
  const handleImgUpload = (e) => {
    setImg(e.target.files[0]);
    if (!img) {
      setbError("Please select image.");
      seterrOpen(true);
      return false;
    }

    if (!img.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      setbError("Please select valid image.");
      seterrOpen(true);

      return false;
    }

    try {
      setLoding(true);

      const imageref = ref(storage, `/images/${img.name}`);
      console.log(imageref, "image");
      const uploadtask = uploadBytesResumable(imageref, img);
      uploadtask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
          console.log(progress, "progress");
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadtask.snapshot.ref).then((downloadURL) => {
            console.log(downloadURL);
            setSuccess("Image Uploaded successfully");
            setOpen(true);
            setLoding(false);
            setImgUrl(downloadURL);
          });
        }
      );
    } catch (error) {
      seterrOpen(true);
      setbError("Something went wrong in Uploading song , please try again");
    }
  };

  const upload = async (data) => {
    console.log(data, "data");
    if (data && imgUrl && audioURL) {
      try {
        await axios
          .post(`http://localhost:4000/artist/addtrack/${id}`, {
            data,
            img: imgUrl,
            audio: audioURL,
            name,
            category: value,
          })
          .then((response) => {
            const result = response.data;
            if (result.success) {
              console.log(result);
              setSuccess("Song added successfully");
              setOpen(true);
              setTimeout(function () {
                navigate("/artist/home");
              }, 2000);
            }
          });
      } catch (error) {
        seterrOpen(true);
        setbError("Something went wrong in adding song , please try again");
      }
    }
  };
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
          <div className="w-full h-full flex justify-center ">
            <div className="flex flex-col items-center sm:w-[81%] h-600 bg-transparent rounded-md p-5 m-1 ">
              <p className="text-2xl font-extrabold">ADD NEW SONG</p>
              <form
                className="w-[70%] gap-2 p-3 "
                onSubmit={handleSubmit(upload)}
              >
                <div className="flex flex-wrap w-full gap-3">
                  <div className="w-[50%] p-2 flex flex-col items-center gap-2">
                    <h1>SONG NAME</h1>
                    <input
                      type="text"
                      className="w-full p-2 rounded-md text-black"
                      placeholder="Enter the song name here"
                      {...register("songName", {
                        required: "Fill this field",
                        maxLength: {
                          value: 20,
                          message: "Field can only contain 20 letters",
                        },
                        minLength: {
                          value: 4,
                          message: "Field should have atleast 4 characters",
                        },
                      })}
                    />
                    {errors?.songName && (
                      <p className="text-red-600">{errors.songName.message}</p>
                    )}
                    <h1>ALBUM NAME</h1>
                    <input
                      type="text"
                      className="w-full p-2 rounded-md text-black"
                      placeholder="Enter the Album name here"
                      {...register("albumName", {
                        required: "Fill this field",
                        maxLength: {
                          value: 20,
                          message: "Field can not exceed 20 characters",
                        },
                        minLength: {
                          value: 4,
                          message: "Field should be atleast 4 characters",
                        },
                      })}
                    />
                    {errors?.albumName && (
                      <p className="text-red-600">{errors.albumName.message}</p>
                    )}
                    <h1>CATEGORY</h1>
                    {/* <input
                      type="text"
                      className="w-full p-2 rounded-md text-black"
                      placeholder="Enter the category"
                      {...register("category", {
                        required: "Fill this field",
                        maxLength: {
                          value: 20,
                          message: "Field can not exceed 20 characters",
                        },
                        minLength: {
                          value: 3,
                          message: "Field should be atleast 3 characters",
                        },
                      })}
                    /> */}
                    {/* {errors?.category && (
                      <p className="text-red-600">{errors.category.message}</p>
                    )} */}
                    <select
                      value={value}
                      onChange={(e) => setvalue(e.target.value)}
                      className="w-32 bg-[#1616e2] rounded-md p-2 text-white"
                    >
                      {Category?.map((category) => (
                        // eslint-disable-next-line react/jsx-key
                        <option key={category?._id} value={category?.name}>
                          {category?.name}
                        </option>
                      ))}
                    </select>
                    <h1>LANGUAGE</h1>
                    <input
                      type="text"
                      className="w-full p-2 rounded-md text-black"
                      placeholder="Enter the language of the song"
                      {...register("language", {
                        required: "Fill this field",
                        maxLength: {
                          value: 20,
                          message: "Field can not exceed 20 characters",
                        },
                        minLength: {
                          value: 4,
                          message: "Field should be atleast 4 characters",
                        },
                      })}
                    />
                    {errors?.language && (
                      <p className="text-red-600">{errors.language.message}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 p-5 w-[48%] items-center">
                    <label className="w-[100%] h-40 bg-[#152537] flex flex-col justify-center items-center">
                      <p className="text-lg text-white text-center">
                        {!loading ? (
                          <CloudUploadIcon />
                        ) : (
                          <Progress value={progress} />
                        )}
                      </p>
                      <p className="text-white">Upload the Image file </p>
                      <div>
                        <input
                          type="file"
                          name="imgFile"
                          accept="image/*"
                          className="w-full h-7"
                          // value={img}
                          onChange={handleImgUpload}
                        />
                      </div>
                    </label>
                    <label className="w-[100%] h-40 bg-[#152537] flex flex-col justify-center items-center">
                      <p className="text-lg text-white text-center">
                        {!loadingAudio ? (
                          <CloudUploadIcon />
                        ) : (
                          <Progress value={progress} />
                        )}
                      </p>
                      <p className="text-white">Upload the Audio file </p>
                      <div>
                        <input
                          type="file"
                          name="audioFile"
                          accept="audio/*"
                          className="w-full h-7"
                          // value={audio}
                          onChange={handleAudioUpload}
                        />
                      </div>
                    </label>
                  </div>
                </div>
                <div className="flex w-full justify-center items-center">
                  <button
                    type="submit"
                    className="bg-sky-800 w-[30%] p-3 rounded-lg  hover:text-xl transition-colors ease-in-out"
                  >
                    UPLOAD
                  </button>
                </div>
              </form>
            </div>
          </div>
          <AppBar
            position="fixed"
            color="transparent"
            sx={{ top: "auto", bottom: 0, height: 95 }}
          >
            <Userdownbar />
          </AppBar>
        </div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
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
        </Snackbar>
      </div>
    </div>
  );
}

export default Addmusic;
