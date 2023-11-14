import React from "react";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="ErrorPage">
      <h1>Oooops!</h1>
      <img src="/404error.png" alt="error" />
      <p>Sorry, an unexpected error has occurred.</p>
    </div>
  );
}
