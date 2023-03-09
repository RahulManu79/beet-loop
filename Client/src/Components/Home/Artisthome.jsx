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

        <AppBar
          position="fixed"
          color="transparent"
          sx={{ top: "auto", bottom: 0, height: 95 }}
        >
          <Userdownbar />
        </AppBar>
      </div>
    </div>
  );
}

export default Artisthome;
