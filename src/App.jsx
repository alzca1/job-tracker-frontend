import "./App.css";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Home from "./Pages/Home/Home";

function App() {
  let location = useLocation();

  useEffect(() => {
    console.log(location);
  }, [location]);

  return (
    <div className="App">
      <Home />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
