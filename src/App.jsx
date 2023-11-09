import "./App.css";
import { useEffect } from "react";
import { Outlet, RouterProvider, createBrowserRouter, useLocation } from "react-router-dom";
import Home from "./Pages/Home/Home";
import UserHome from "./Pages/UserHome/UserHome";
import Navbar from "./components/Navbar/Navbar";
import Root from "./components/Root/Root";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import Auth from "./components/Auth/Auth";
import { checkAuthToken } from "./helpers/auth";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "/auth",
          element: <Auth />,
        },
        {
          path: "/home",
          element: <UserHome />,
          loader: checkAuthToken,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
