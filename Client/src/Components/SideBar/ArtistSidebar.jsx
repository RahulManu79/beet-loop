import React, { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import ArtistSidebarSmall from "./ArtistSideBarSmall";
import ArtistSidebar from "./ArtistSidebarBig";

const ArtistSidebarMain = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [parentDiv] = useAutoAnimate();

  return (
    <div ref={parentDiv} className="z-50">
      {!isOpen && <ArtistSidebarSmall setIsOpen={setIsOpen} />}
      {isOpen && <ArtistSidebar setIsOpen={setIsOpen} />}
    </div>
  );
};

export default ArtistSidebarMain;
