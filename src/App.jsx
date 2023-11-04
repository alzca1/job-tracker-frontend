import "./App.css";
import logo from "/logo.jpeg";
import { Login } from "./components/Login/Login.jsx";
import Welcome from "./components/Welcome/Welcome.jsx";
import { Button } from "antd";
import { useState } from "react";
import { motion } from "framer-motion";

function App() {
  const [mustShowLogin, setMustShowLogin] = useState(false);

  return (
    <div className="App">
      <img src={logo} alt="job-tracker logo" />
      <h1>Job Tracker</h1>
      <h4>The best job-tracker around!</h4>
      {mustShowLogin ? (
        <Login />
      ) : (
        <div className="callToActionApp">
          <Button
            onClick={() => setMustShowLogin(!mustShowLogin)}
            size="large"
            shape="round"
            type="primary"
          >
            Start tracking your jobs
          </Button>
        </div>
      )}
    </div>
  );
}

export default App;
