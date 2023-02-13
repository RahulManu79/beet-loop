import { useState } from "react";
import "./App.css";
import UserLogin from "./Components/Login/UserLogin";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <UserLogin />
    </div>
  );
}

export default App;
