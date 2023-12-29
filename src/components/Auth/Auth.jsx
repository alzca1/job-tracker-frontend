import React from "react";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import { useSearchParams } from "react-router-dom";

export default function Auth() {
  const [searchParams] = useSearchParams();
  const isSignUp = searchParams.get("mode") === "signup";

  return <>{isSignUp ? <SignUp /> : <Login />}</>;
}
