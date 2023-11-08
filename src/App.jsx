import "./App.css";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Home from "./Pages/Home/Home";
import AuthProvider from "./context/AuthContext";

function App() {
  let location = useLocation();

  useEffect(() => {
    console.log(location);
  }, [location]);

  return (
    <AuthProvider>
      <div className="App">
        <Home />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
