import React from "react";
import { Link } from "react-router-dom";
import { BsCurrencyExchange, BsListTask } from "react-icons/bs";
import { TiWeatherPartlySunny } from "react-icons/ti";
const Navbar = () => {
  const tk = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <span className="navbar-brand">Trident</span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/converter">
                EUR &gt; USD <BsCurrencyExchange color="#4287f5" />
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/meteo">
                Meteo <TiWeatherPartlySunny color="#f0f1f2" />
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tasks">
                Task List <BsListTask color="#f5b618" />
              </Link>
            </li>
            {!tk ? (
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <span className="badge rounded-pill bg-info text-dark">
                    Login
                  </span>
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <span className="nav-link">
                  <span className=" badge rounded-pill bg-info text-dark text-capitalize">
                    {user.name}
                  </span>
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
