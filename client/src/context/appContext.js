import axios from "axios";
import React, { useState, useReducer, useContext } from "react";
import {
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
} from "./actions";
import reducer from "./reducers";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const initialState = {
  user: user ? JSON.stringify(user) : null,
  token: token,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const urlBE = "http://localhost:3001";

  const [state, dispatch] = useReducer(reducer, initialState);

  // aggiungo a localstorage
  const addUserToLS = ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };
  

  const registerUser = async (currUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const response = await axios.post(urlBE + "/api/auth/register", currUser);
      const { user, token } = response.data;

      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: {
          user,
          token,
        },
      });
      addUserToLS({ user, token });
    } catch (error) {
      console.log(error.response);

      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  const loginUser = async (currUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });

    try {
      const { data } = await axios.post(urlBE + "/api/auth/login", currUser);
      const { user, token } = data;
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: {
          user,
          token,
        },
      });
      addUserToLS({ user, token });

    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
        
      });
    }
  };

  return (
    <AppContext.Provider value={{ ...state, registerUser, loginUser }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext, initialState };
