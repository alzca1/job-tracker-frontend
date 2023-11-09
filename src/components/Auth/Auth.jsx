import React from "react";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import { useSearchParams } from "react-router-dom";

export default function Auth() {
  const [searchParams] = useSearchParams();
  console.log(searchParams);
  const isLogin = searchParams.get("mode") === "login";
  console.log("isLogin", isLogin);
  return <div>{isLogin ? <Login /> : <SignUp />}</div>;
}
