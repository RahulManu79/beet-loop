import React from "react";
import Header from "../Header/Userheader";
import ArtistSidebarMain from "../SideBar/ArtistSidebar";

function Artisthome() {
  return (
    <div className=" bg-[#0F1F32] flex">
      <ArtistSidebarMain />
      <div className="w-full flex justify-end content-end">
        <Header />
      </div>
    </div>
  );
}

export default Artisthome;
