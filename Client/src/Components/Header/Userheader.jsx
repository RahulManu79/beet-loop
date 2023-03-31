/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  AppBar,
  styled,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout } from "../../redux/Slice/UserSlice";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const IconBox = styled(Toolbar)({
  display: "flex",
  gap: "20px",
  align: "center",
});

const UserBox = styled(Box)(() => ({
  display: "flex",
  gap: "20px",
  alignItems: "center",
}));

const Header = () => {
  const [open, setOpen] = useState(false);
  const [currentUser, setcurrentUser] = useState(null);
  const { name, pic } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (name) {
      setcurrentUser(name);
    } else {
      setcurrentUser(null);
    }
  }, []);

  const handleLogout = () => {
    dispatch(setLogout());
    localStorage.removeItem("token");
    setcurrentUser(null);
    navigate("/login");
  };

  const getProfile = () => {
    navigate("/profile");
  };
  return (
    <div className="h-[64px] w-full flex justify-end ">
      <StyledToolbar>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex  items-center py-4">
            <button type="submit" className="p-2 focus:outline-none focus:ring">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                color="white"
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
            className="w-64  py-2 pl-10 text-sm rounded-md focus:outline-none bg-[#1D364F] mr-20 text-white"
          />
        </div>
        <div className="mr-16">
          <Box sx={{ color: "action.active" }}>
            <Badge color="secondary" variant="dot">
              <MailIcon />
            </Badge>
          </Box>
        </div>
        <div>
          <UserBox className="mr-5" onClick={(e) => setOpen(true)}>
            <Avatar sx={{ width: "30px", height: "30px" }} src={pic} />
            <Typography color="white" fontFamily={"sans-serif"} varient="span">
              {currentUser}
            </Typography>
          </UserBox>
          <Menu
            onClose={(e) => setOpen(false)}
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            open={open}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={getProfile}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </StyledToolbar>
    </div>
  );
};

export default Header;
