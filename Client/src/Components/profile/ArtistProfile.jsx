import React, { useState, useEffect } from "react";
import Header from "../Header/Userheader";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getArtistProfile } from "../../Api/Api";
import { Link } from "react-router-dom";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ArtistProfileSidebar from "../SideBar/ProfileSidebar/ArtistProfileSideBar";
function ArtistProfile() {
  const [user, setUser] = useState(null);
  const { id } = useSelector((state) => state.artistLogin);
  const navigate = useNavigate();

  useEffect(() => {
    async function invoke() {
      const data = await getArtistProfile(id);
      console.log(data);
      if (data.success === false) {
        navigate("/login");
      } else {
        setUser(data.data);
        console.log(user);
      }
    }
    console.log("vann");
    invoke();
  }, []);

  return (
    <div className="absolute w-5/6 right-0 h-screen bg-[#0F1F32] flex">
      <ArtistProfileSidebar />

      <div className=" w-full">
        <div className="w-full  flex justify-end content-end">
          <Header />
        </div>

        <h1 className="text-white ml-8 font-extrabold text-2xl">
          Account overview
        </h1>
        <h1 className="text-white ml-8 text-2xl mt-3 font-extrabold">
          Profile
        </h1>

        <div className="   w-12/12 flex justify-center items-center ">
          <div className=" ">
            <div className=" rounded-lg flex justify-center shadow-sm-500 items-center content-center">
              <table className="w-[500px] text-white shadow-md">
                <tr className="border-b-2 border-black">
                  <th className="">User Name:</th>
                  <td className="p-3 text-sm">{user?.name}</td>
                </tr>
                <tr className="border-b-2 border-black">
                  <th>Email</th>
                  <td className="p-3 text-sm ">{user?.email}</td>
                </tr>
                <tr className="border-b-2 border-black">
                  <th>Phone</th>
                  <td className="p-3 text-sm border-black">{user?.phone}</td>
                </tr>
              </table>
            </div>
            <Stack spacing={2} direction="row" className="mt-5">
              <Link to="/profile/edit">
                <Button
                  variant="outlined"
                  sx={({ color: "white" }, { border: { color: "white" } })}
                  onClick={() => navigate("/artist/edit-profile")}
                >
                  Edit Profile
                </Button>
              </Link>
            </Stack>
          </div>
        </div>
        {/* <div className=" w-full h-fit p-8 ">
          <h2 className="text-white text-2xl font-semibold ">Your Plan</h2>
          <div className="rounded-md w-full h-80">
            <div className="w-full h-36 bg-white rounded-t-md shadow-md">
              <h1 className="text-black text-2xl font-bold p-14 ">
                BeatLoop Free
              </h1>
            </div>
            <div className="w-full h-44 bg-slate-600 rounded-b-md shadow-md p-14">
              <h3 className="text-black text-lg font-bold">
                Play any songs, any time, with ads
              </h3>
              <hr className="mt-3" />
              <h2 className="text-black text-3xl mt-2 font-extrabold">Free</h2>
            </div>
          </div>
        </div> */}
        {/* <div className="p-9  ">
          <Link to="/plans">
            <Button
              className="rounded-xl hover"
              variant="outlined"
              sx={({ color: "white" }, { border: { color: "white" } })}
              onClick={() => navigate("/plans")}
            >
              Join Premium
            </Button>
          </Link>
        </div> */}
      </div>
    </div>
  );
}

export default ArtistProfile;
