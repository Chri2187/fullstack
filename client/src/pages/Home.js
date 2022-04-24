import React, { useState } from "react";
import Cards from "../components/Cards";
import data from "../progetti";

const Home = () => {
  return (
    <>
      <div className="text-center my-5">
        <h1>Progetti</h1>
      </div>
      <div className="container mt-5">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {data.map((el) => (
            <Cards key={el.id} {...el} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
