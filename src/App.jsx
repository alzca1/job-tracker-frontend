import "./App.css";
import logo from "/logo.jpeg";
import Login from "./components/Sign/Login/Login";
import SignView from "./components/Sign/SignView";

import { Button } from "antd";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link, Outlet } from "react-router-dom";

function App() {
  const [currentView, setCurrentView] = useState();

  return (
    <div className="App">
      <img src={logo} alt="job-tracker logo" />
      <h1>Job Tracker</h1>
      <h4>The best job-tracker around!</h4>
      <div className="callToActionApp">
        <Link to="/login">
          <Button size="large" shape="round" type="primary">
            Start tracking your jobs
          </Button>
        </Link>
      </div>
      <Outlet />
    </div>
  );
}

export default App;
