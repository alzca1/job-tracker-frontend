import React, { useEffect, useState } from "react";
import logo from "/logo.jpeg";
import { Button } from "antd";
import { Link, useLocation } from "react-router-dom";

export default function Home() {
  const [route, setRoute] = useState("/");

  const currentRoute = useLocation();
  useEffect(() => {
    setRoute(currentRoute.pathname);
  }, [currentRoute]);

  return (
    <div className="Home">
      <img src={logo} alt="job-tracker logo" />
      <h1>Job Tracker</h1>
      <h4>The best job-tracker around!</h4>
      <div className="callToActionApp">
        <Link to="/auth?mode=login">
          <Button size="large" shape="round" type="primary">
            Start tracking your jobs
          </Button>
        </Link>
      </div>
    </div>
  );
}
