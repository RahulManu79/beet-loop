import React, { useState } from "react";
import UserSidebar from "./UserSidebar";
import Usersidebarsmall from "./Usersidebarsmall";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const SidebarMain = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [parentDiv] = useAutoAnimate();

  return (
    <div ref={parentDiv}>
      {!isOpen && <Usersidebarsmall setIsOpen={setIsOpen} />}
      {isOpen && <UserSidebar setIsOpen={setIsOpen} />}
    </div>
  );
};

export default SidebarMain;
