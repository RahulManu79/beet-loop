import React from "react";
// import logo from "../../assets/png.png";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import EditIcon from "@mui/icons-material/Edit";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import HttpsIcon from "@mui/icons-material/Https";
// eslint-disable-next-line react/prop-types
function UserProfileSidebar() {
  return (
    <>
      <div className="bg-[#152537] fixed left-0 top-0 w-1/6 h-screen rounded-xl ">
        <div className="flex justify-center items-center shadow-lg  h-36">
          <Stack direction="row" spacing={2}>
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              sx={{ width: 60, height: 60 }}
            />
          </Stack>
        </div>
        <div className="flex justify-center items-center shadow-lg h-16">
          <Link className="flex justify-around" to="/profile">
            <HomeIcon />

            <p className="text-white"> Account Overview</p>
          </Link>
        </div>
        <div className="flex justify-center items-center shadow-lg h-16">
          <Link className="flex justify-around" to="/profile/edit">
            <EditIcon />
            <p className="text-white"> Edit profile</p>
          </Link>
        </div>

        <div className="flex justify-center items-center shadow-lg h-16">
          <Link className="flex justify-around" to="/profile/resetpass">
            <HttpsIcon />
            <p className="text-white">Reset Password</p>
          </Link>
        </div>
      </div>
    </>
  );
}

export default UserProfileSidebar;
