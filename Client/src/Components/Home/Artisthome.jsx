import React from "react";
import Userdownbar from "../DownBar/Userdownbar";
import Artistheader from "../Header/Artistheader";
import ArtistSidebarMain from "../SideBar/ArtistSidebar";
import { AppBar } from "@mui/material";

function Artisthome() {
  return (
    <div className="bg-[#0F1F32] flex  ">
      <ArtistSidebarMain />
      <div className="w-full fixed  ">
        <Artistheader />
      </div>
    </div>
  );
}

export default Artisthome;
