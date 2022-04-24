import React from "react";
import { Link } from "react-router-dom";

const Cards = ({ titolo, testo, img, link }) => {
  return (
    <div className="col">
      <div className="card" style={{ width: "18rem" }}>
        <img src={img} className="card-img-top" alt={titolo} />
        <div className="card-body">
          <h5 className="card-title">{titolo}</h5>
          <p className="card-text">{testo}</p>
          <Link to={link} className="btn btn-primary d-grid gap-2">
            Apri
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cards;
