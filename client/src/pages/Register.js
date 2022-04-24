import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import FormInput from "../components/FormInput";
import { useAppContext } from "../context/appContext";

const initialState = {
  name: "",
  lastname: "",
  email: "",
  birthDay: "",
  isRegistered: true,
};
const Register = () => {
  const [values, setValues] = useState(initialState);
  const navigate = useNavigate();

  const { registerUser, loginUser, token } = useAppContext();

  const toggleRegistered = () => {
    setValues({ ...values, isRegistered: !values.isRegistered });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, lastname, email, birthDay, isRegistered } = values;

    if (!lastname || !email || (!name && !isRegistered)) {
      Swal.fire("Tutti i campi sono obbligatori", "", "warning");
      return;
    }

    const currUser = { name, lastname, email, birthDay };

    if (isRegistered) {
      loginUser(currUser);
    } else {
      registerUser(currUser);
    }
  };

  useEffect(() => {
    if (token) {
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    }
  }, [token, navigate]);

  return (
    <>
      <div
        id="formContainer"
        className="container shadow-lg p-3 mb-5 bg-body rounded"
      >
        <h1 className="text-center">
          {values.isRegistered ? "Login" : "Registrati"}
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <FormInput
              type="text"
              value={values.name}
              name="name"
              labelText="Nome"
              handleChange={handleChange}
            />
            <FormInput
              type="text"
              value={values.lastname}
              name="lastname"
              labelText="Cognome"
              handleChange={handleChange}
            />
            <FormInput
              type="email"
              value={values.email}
              name="email"
              labelText="Email"
              handleChange={handleChange}
            />
            <FormInput
              type="date"
              value={values.birthDay}
              name="birthDay"
              labelText="Data di Nascita"
              handleChange={handleChange}
            />
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-outline-success mb-3">
              {!values.isRegistered ? "Registrati" : "Login"}
            </button>
            <p className="m-0 ">
              {!values.isRegistered
                ? "Sei già registrato?"
                : "Non sei ancora registrato?"}
            </p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={toggleRegistered}
            >
              {!values.isRegistered ? "Login" : "Registrati"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
