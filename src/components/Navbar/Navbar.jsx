import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "/logo.jpeg";

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <>
      {pathname !== "/" ? (
        <div className="Bar">
          <Link to="/">
            <div className="bar-logo">
              <img src={logo} />
              <span>Job Tracker</span>
            </div>
          </Link>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
