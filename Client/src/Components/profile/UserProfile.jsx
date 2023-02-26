import React, { useState, useEffect } from "react";
import Header from "../Header/Userheader";
import UserProfileSidebar from "../SideBar/ProfileSidebar/UserProfileSidebar";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../Api/Api";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
function UserProfile() {
  const [user, setUser] = useState(null);
  const { id } = useSelector((state) => state.userLogin);
  const navigate = useNavigate();

  useEffect(() => {
    async function invoke() {
      const data = await getProfile(id);
      if (data.status === "failed") {
        navigate("/login");
      } else {
        setUser(data.data);
        console.log(user);
      }
    }
    invoke();
  }, []);
  const editProfile = () => {
    navigate("/profile/edit");
  };
  return (
    <div className=" w-full h-screen bg-[#0F1F32] flex">
      <UserProfileSidebar />

      <div className=" w-5/6">
        <div className="w-full  flex justify-end content-end">
          <Header />
        </div>

        <h1 className="text-white ml-8 font-extrabold text-2xl">
          Account overview
        </h1>
        <h1 className="text-white ml-8 text-2xl mt-3 font-extrabold">
          Profile
        </h1>

        <div className=" h-4/6 w-12/12 flex justify-center items-center ">
          <div className=" ">
            <div className=" rounded-lg flex justify-center shadow-sm-500 items-center content-center">
              <table className="w-[900px] text-white shadow-md">
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
              <Button
                variant="outlined"
                sx={({ color: "white" }, { border: { color: "white" } })}
                onClick={editProfile}
              >
                Edit Profile
              </Button>
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
