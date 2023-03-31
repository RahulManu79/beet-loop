import React, { useState, useEffect } from "react";
import Header from "../Header/Userheader";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getArtistProfile } from "../../Api/Api";
import Button from "@mui/material/Button";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useDispatch } from "react-redux";
import { TextFiledCustom } from "../../ui/TextField";
import { setLogin } from "../../redux/Slice/UserSlice";
import ArtistProfileSidebar from "../SideBar/ProfileSidebar/ArtistProfileSideBar";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function ArtistEditProfile() {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setbError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { id, token } = useSelector((state) => state.userLogin);
  const [open, setOpen] = React.useState(false);
  const [erropen, seterrOpen] = React.useState(false);
  const dispatch = useDispatch();

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

  useEffect(() => {
    async function invoke() {
      const data = await getArtistProfile(id);

      if (data.status === "failed") {
        navigate("/login");
        localStorage.removeItem("token");
      } else {
        setUser(data.data);
        setName(user.name);
        setEmail(user.email);
        setPhone(user.phone);
      }
    }
    invoke();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:4000/artist/updateprofile?id=${id}`,
        {
          email,
          name,
          phone,
        },
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );
      let result = res.data;
      console.log(result, "====");
      if (result.success) {
        setOpen(true);
        setSuccess(res?.data?.message);
        dispatch(
          setLogin({
            user: "user",
            name: result?.name,
            token: token,
            id: result.id,
          })
        );
        navigate("/artist/profile");
      } else {
        console.log(error);
        seterrOpen(true);
        setbError(res?.data?.message);
      }
    } catch (error) {
      seterrOpen(true);
      setbError("error in updating profile");
      console.log(error);
    }
  };

  console.log(email, name, phone);
  return (
    <div className=" absolute w-5/6 right-0 h-screen bg-[#0F1F32] flex">
      <ArtistProfileSidebar />

      <div className=" w-full">
        <div className="w-full  flex justify-end content-end">
          <Header />
        </div>

        <h1 className="text-white ml-9 mt-14 font-extrabold text-2xl">
          Edit Profile
        </h1>

        <div className=" mt-24 w-12/12 flex justify-center items-center ">
          <div className=" ">
            <div className=" rounded-lg flex justify-center shadow-sm-500 items-center content-center">
              <div className="flex flex-col ">
                <form>
                  <div className="flex justify-center ml-1 ">
                    <TextFiledCustom
                      id="standard-basic"
                      label={user?.name}
                      required
                      variant="standard"
                      type="text"
                      name="name"
                      sx={{
                        width: 500,
                        maxWidth: "100%",
                        height: 42,
                      }}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-center ml-1 mt-2">
                    <TextFiledCustom
                      id="standard-basic"
                      label={user?.email}
                      variant="standard"
                      type="email"
                      name="email"
                      sx={{
                        width: 500,
                        maxWidth: "100%",
                        height: 42,
                      }}
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-center ml-1 mt-2">
                    <TextFiledCustom
                      id="standard-basic"
                      label={user?.phone}
                      variant="standard"
                      type="text"
                      name="phone"
                      sx={{
                        width: 500,
                        maxWidth: "100%",
                        height: 42,
                      }}
                      required
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-center mt-8">
                    <Button variant="contained" onClick={handleSubmit}>
                      Update
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
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

export default ArtistEditProfile;
