import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import {
  AppBar,
  styled,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout } from "../../redux/Slice/UserSlice";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const IconBox = styled(Toolbar)({
  display: "flex",
  gap: "20px",
  align: "center",
});

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "20px",
  alignItems: "center",
}));

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#57CC99",
    },
  },
});

const Header = () => {
  const [open, setOpen] = useState(false);
  const [currentUser, setcurrentUser] = useState(null);
  const { name } = useSelector((state) => state.userLogin);
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
    setcurrentUser(null);
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <AppBar position="fixed" color={"secondary"}>
          <StyledToolbar>
            <IconBox onClick={() => navigate("/")}>
              <img src="./logo2.png" width={"50px"} alt="" />
              <Typography
                variant="h6"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                Medi care
              </Typography>
            </IconBox>

            <div>
              <UserBox onClick={(e) => setOpen(true)}>
                <Avatar
                  sx={{ width: "30px", height: "30px" }}
                  src="https://w7..com/pngs/481/915/png-transparent-computer-icons-user-avatar-woman-avatar-computer-business-conversation-thumbnail.png"
                />
                <Typography varient="span">{currentUser}</Typography>
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
                <MenuItem>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          </StyledToolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  );
};

export default Header;
