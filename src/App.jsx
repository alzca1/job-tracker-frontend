import "./App.css";
import logo from "/logo.jpeg";
import Login from "./components/Sign/Login/Login";
import SignView from "./components/Sign/SignView";

import { Button } from "antd";
import { useState } from "react";
import { motion } from "framer-motion";

function App() {
  const [currentView, setCurrentView] = useState();

  return (
    <div className="App">
      <img src={logo} alt="job-tracker logo" />
      <h1>Job Tracker</h1>
      <h4>The best job-tracker around!</h4>
      {currentView ? (
        <SignView view={currentView} handleView={setCurrentView} />
      ) : (
        <div className="callToActionApp">
          <Button onClick={() => setCurrentView("LOGIN")} size="large" shape="round" type="primary">
            Start tracking your jobs
          </Button>
        </div>
      )}
    </div>
  );
}

export default App;
