import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="container mt-4 p-5 text-center">
      <h1>Pagina non trovata</h1>
      <p>
        torna alla <Link to="/">homepage</Link>{" "}
      </p>
    </div>
  );
};

export default ErrorPage;
