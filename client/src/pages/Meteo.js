import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";

const Meteo = () => {
  const [city, setCity] = useState("");
  const [data, setData] = useState({});
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=it&appid=e3f99f168d808da83e8274ef78302803&units=metric`;

  const handleSearch = async () => {
    if (!city) {
      Swal.fire("Inserisci una città", "", "question");
    } else {
      const response = await axios.get(url);
      setData(response.data);
    }
    setCity("");
  };
  return (
    <main className="container mt-3 ">
      <div className="text-center my-5">
        <h1>Meteo App</h1>
      </div>
      <section className="weatherResults shadow-lg p-3 mb-5 bg-body rounded">
        <div className="container my-5">
          <div className="input-group mb-3 ">
            <input
              type="text"
              className="form-control "
              placeholder="Insert city"
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
            <button
              className="btn btn-success"
              type="button"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
        <div className="location d-flex">
          {data.name ? <h1>{data.name}</h1> : null}
          {data.sys ? <p className="bold">{data.sys.country}</p> : null}
        </div>
        <div className="temp">
          {data.main ? (
            <h1 style={{ fontSize: "6rem" }}>{Math.floor(data.main.temp)}°C</h1>
          ) : null}
        </div>
        <div className="description">
          {data.main ? (
            <h3 className="bold text-capitalize">
              {data.weather[0].description}
            </h3>
          ) : null}
        </div>

        <div className="bottom text-white">
          <div className="feels">
            {data.main ? (
              <p className="bold">{Math.floor(data.main.feels_like)}°C</p>
            ) : null}
            <p className="bold">Percepito</p>
          </div>
          <div className="humidity">
            {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
            <p className="bold">Umidità</p>
          </div>
          <div className="wind">
            {data.wind ? (
              <p className="bold">{Math.floor(data.wind.speed)} km/h</p>
            ) : null}

            <p className="bold">Vento</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Meteo;
