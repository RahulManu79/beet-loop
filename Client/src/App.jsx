import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ArtistRegister from "./Pages/ArtistRegister";
import Signoptins from "./Pages/Signoptins";
import UserLogin from "./Pages/UserLogin";
import Userregister from "./Pages/Userregister";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserLogin />} />
        <Route path="/signoptions" element={<Signoptins />} />
        <Route path="/userregister" element={<Userregister />} />
        <Route path="/artistregister" element={<ArtistRegister />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
