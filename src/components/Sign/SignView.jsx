import React from "react";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";



export default function SignView({ view, handleView }) {
  
  return (
    <div>
      {view === "LOGIN" ? <Login handleView={handleView} /> : <SignUp handleView={handleView} />}
    </div>
  );
}
