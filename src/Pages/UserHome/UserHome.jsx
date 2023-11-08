import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "antd";

export default function UserHome() {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Is authenticated?", isAuthenticated);
    if (!isAuthenticated) {
      navigate("/home");
    }
  }, []);

  return <div>UserHome</div>;
}
