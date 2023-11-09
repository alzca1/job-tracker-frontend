import { redirect } from "react-router-dom";

export const getToken = () => {
  const userSessionInfo = JSON.parse(sessionStorage.getItem("user"));
  return userSessionInfo;
};

export const checkAuthToken = () => {
  const token = getToken();

  if (!token) {
    return redirect("/auth");
  }

  return null;
};

export const checkAlreadyLogged = () => {
  const token = getToken();

  if (token) {
    return redirect("/home");
  }
  return null;
};
