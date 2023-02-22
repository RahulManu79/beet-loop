import React from "react";
import Header from "../Header/Try";
import Userheader from "../Header/Userheader";
import SidebarMain from "../SideBar/SidebarMain";

function Userhome() {
  return (
    <>
      <div className="min-h-[100vh] bg-[#0F1F32] flex">
        <SidebarMain />
        <div className="w-full flex justify-end content-end">
          <Header />
        </div>
      </div>
    </>
  );
}

export default Userhome;
