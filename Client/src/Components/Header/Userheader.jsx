import React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useSelector, useDispatch } from "react-redux";
import {
  AppBar,
  styled,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";

function Userheader() {
  const { name } = useSelector((state) => state.userLogin);

  return (
    <div className="bg-black w-40  h-16 ml-96 self-auto content-center flex justify-center">
      <UserBox></UserBox>
      <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
    </div>
  );
}

export default Userheader;
