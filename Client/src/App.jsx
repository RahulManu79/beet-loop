/* eslint-disable react/react-in-jsx-scope */
import { AppBar } from "@mui/material";
import { Box } from "@mui/system";
import {} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Userdownbar from "./Components/DownBar/Userdownbar";
import Admin from "./routes/Admin";
import Artist from "./routes/Artist";
import User from "./routes/User";

function App() {
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<User />} />
          <Route path="/artist/*" element={<Artist />} />
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      </BrowserRouter>
      <AppBar
        position="fixed"
        color="transparent"
        sx={{ bottom: 0, top: "auto", height: 95 }}
      >
        <Userdownbar />
      </AppBar>
    </>
  );
}

export default App;
