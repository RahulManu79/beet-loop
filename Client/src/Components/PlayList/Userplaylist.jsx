import React from "react";

import Userdownbar from "../DownBar/Userdownbar";
import Header from "../Header/Userheader";
import SidebarMain from "../SideBar/SidebarMain";

function Userplaylist() {
  return (
    <>
      <div className="bg-[#0F1F32] flex">
        <SidebarMain />
        <div className="w-full fixed flex justify-end content-end">
          <Header />
        </div>
        <div className="w-full h-screen flex items-end">
          <Userdownbar />
        </div>
      </div>
    </>
  );
}

export default Userplaylist;
