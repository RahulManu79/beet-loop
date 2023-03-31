import React, { useState } from "react";
// import logo from "../../assets/png.png";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
// import Avatar from "@mui/material/Avatar";
import HttpsIcon from "@mui/icons-material/Https";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../Config/firebase.config";
import { Progress } from "../../../ui/Button";
import { addArtistProfilePic } from "../../../Api/Api";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useSelector } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
// eslint-disable-next-line react/prop-types
function ArtistProfileSidebar() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imgUrl, setImgUrl] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  const [visible, setVisible] = useState(false);
  const [edit, setEdit] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [erropen, seterrOpen] = React.useState(false);
  const [success, setSuccess] = useState(null);
  const [error, seterror] = useState(null);
  const { id, pic } = useSelector((state) => state.artistLogin);
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
  const handleProfilePic = async () => {
    setLoading(true);
    if (imageUpload == null) return;
    const imageRef = ref(storage, `profile/${imageUpload.name}`);
    const uploadImage = uploadBytesResumable(imageRef, imageUpload);
    console.log(uploadImage);
    uploadImage.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadImage.snapshot.ref).then((downloadURL) => {
          setLoading(false);
          setImgUrl(downloadURL);
          setVisible(false);
          setEdit(false);
        });
      }
    );

    if (imgUrl) {
      const obj = {
        img: imgUrl,
        id: id,
      };
      console.log("xxx");
      console.log(imgUrl);
      const data = await addArtistProfilePic(obj);
      console.log(data, "++++++");
      if (data.success == true) {
        setOpen(true);
        setSuccess(data.message);
      } else {
        seterrOpen(true);
        seterror(data.message);
      }
    }
  };

  const handleEdit = () => {
    setEdit(true);
    setVisible(true);
  };
  return (
    <>
      <div className="bg-[#152537] fixed left-0 top-0 w-1/6 h-screen rounded-xl ">
        <div className="flex flex-col justify-center items-center shadow-lg  h-52">
          {/* <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              sx={{ width: 60, height: 60 }}
            /> */}
          {loading && <Progress value={progress} />}
          {!imgUrl && (
            <span className="inline-block h-24 w-24 overflow-hidden rounded-full bg-gray-100">
              <svg
                className="h-full w-full text-gray-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </span>
          )}

          {imgUrl && (
            <div>
              <LazyLoadImage
                src={imgUrl ? imgUrl : pic}
                className="w-32 h-32 rounded-full"
                alt="Image Alt"
              />

              {/* <img src={} alt="" className="" /> */}
            </div>
          )}
          {visible && (
            <div className="bg-purple-700 border px-2 py-2 flex flex-col justify-center">
              <input
                type="file"
                onChange={(event) => {
                  setImageUpload(event.target.files[0]);
                }}
                accept="image/*"
                className="h-10 rounded-md border border-gray-300 bg-white py-1.5 px-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50"
              />
              <div className="flex justify-center">
                <Button
                  variant="contained"
                  sx={{
                    width: "50px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                  onClick={handleProfilePic}
                >
                  Update
                </Button>
              </div>
            </div>
          )}
          {!edit && (
            <Button variant="contained" onClick={handleEdit}>
              Edit
            </Button>
          )}
        </div>
        <div className="flex justify-center items-center shadow-lg h-16">
          <Link className="flex justify-around" to="/artist/profile">
            <HomeIcon />

            <p className="text-white"> Account Overview</p>
          </Link>
        </div>
        <div className="flex justify-center items-center shadow-lg h-16">
          <Link className="flex justify-around" to="/artist/edit-profile">
            <EditIcon />
            <p className="text-white"> Edit profile</p>
          </Link>
        </div>

        <div className="flex justify-center items-center shadow-lg h-16">
          <Link className="flex justify-around" to="/artist/resetpass">
            <HttpsIcon />
            <p className="text-white">Reset Password</p>
          </Link>
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
    </>
  );
}

export default ArtistProfileSidebar;
