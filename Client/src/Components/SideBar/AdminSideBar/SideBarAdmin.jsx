import React from "react";
import "./sidebar.css";
import logo from "../../../assets/png.png";
import HomeIcon from "@mui/icons-material/Home";
import AppsIcon from "@mui/icons-material/Apps";
import MicIcon from "@mui/icons-material/Mic";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";

function SideBarAdmin() {
  return (
    <>
      <aside className="gradiant  h-screen  hidden sm:block ">
        <div className=" ">
          <div className=" h-screen  p-3 shadow w-60 sm:w-72">
            <div className="space-y-3">
              {/* <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center py-4">
                  <button
                    type="submit"
                    className="p-2 focus:outline-none focus:ring"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                </span>
                <input
                  type="search"
                  name="Search"
                  placeholder="Search..."
                  className="w-full py-2 pl-10 text-sm rounded-md focus:outline-none"
                />
              </div> */}
              <div className="flex justify-center content-center">
                <img
                  className=""
                  src={logo}
                  alt=""
                  height="100px"
                  width="73%"
                />
              </div>
              <div className="flex-1">
                <ul className="pt-2 pb-4 space-y-1 text-lg ml-7 mt-4 ">
                  <li className="rounded-sm">
                    <Link to="/admin/home">
                      <span className="flex items-center p-2 space-x-3 rounded-md">
                        <HomeIcon sx={{ color: "white" }} />
                        <span className="text-gray-100">Home</span>
                      </span>
                    </Link>
                  </li>
                  <li className="rounded-sm">
                    <Link to="/admin/category">
                      <span
                        href="#"
                        className="flex items-center p-2 space-x-3 rounded-md"
                      >
                        <AppsIcon sx={{ color: "white" }} />
                        <span className="text-gray-100 ">Category</span>
                      </span>
                    </Link>
                  </li>
                  <li className="rounded-sm">
                    <Link to="/admin/artists">
                      <span className="flex items-center p-2 space-x-3 rounded-md">
                        <MicIcon sx={{ color: "white" }} />
                        <span className="text-gray-100">Artists</span>
                      </span>
                    </Link>
                  </li>
                  <li className="rounded-sm">
                    <Link to="/admin/musics">
                      <span className="flex items-center p-2 space-x-3 rounded-md">
                        <PlayCircleIcon sx={{ color: "white" }} />
                        <span className="text-gray-100">Musics</span>
                      </span>
                    </Link>
                  </li>
                  <li className="rounded-sm">
                    <Link to="/admin/userList">
                      <span className="flex items-center p-2 space-x-3 rounded-md">
                        <SupervisedUserCircleIcon sx={{ color: "white" }} />
                        <span className="text-gray-100">Users</span>
                      </span>
                    </Link>
                  </li>
                  <li className="rounded-sm">
                    <Link to="/admin/logout">
                      <span className="flex items-center p-2 space-x-3 rounded-md">
                        <LogoutIcon sx={{ color: "white" }} />
                        <span className="text-gray-100">Logout</span>
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default SideBarAdmin;
