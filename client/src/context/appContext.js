import axios from 'axios';
import React, { useReducer, useContext } from 'react';
import {
    REGISTER_USER_BEGIN,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
    LOGIN_USER_BEGIN,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
} from './actions';
import reducer from './reducers';
import Swal from 'sweetalert2';

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
const initialState = {
    user: user ? JSON.stringify(user) : null,
    token: token,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const urlBE = 'http://localhost:3001';

    const [state, dispatch] = useReducer(reducer, initialState);

    // aggiungo a localstorage
    const addUserToLS = ({ user, token }) => {
        localStorage.setItem('user', user.name);
        localStorage.setItem('token', token);
    };

    // REGISTER
    const registerUser = async (currUser) => {
        dispatch({ type: REGISTER_USER_BEGIN });
        try {
            const response = await axios.post(
                urlBE + '/api/auth/register',
                currUser
            );
            const { user, token } = response.data;
            Swal.fire({
                icon: 'success',
                title: 'Ok',
                text: 'Registration successful!',
                showConfirmButton: false,
                timer: 1000,
            });
            dispatch({
                type: REGISTER_USER_SUCCESS,
                payload: {
                    user,
                    token,
                },
            });
            addUserToLS({ user, token });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${error.response.data.msg}`,
            });
            dispatch({
                type: REGISTER_USER_ERROR,
                payload: { msg: error.response.data.msg },
            });
        }
    };

    // LOGIN
    const loginUser = async (currUser) => {
        dispatch({ type: LOGIN_USER_BEGIN });

        try {
            const { data } = await axios.post(
                urlBE + '/api/auth/login',
                currUser
            );
            const { user, token } = data;
            Swal.fire({
                icon: 'success',
                title: 'Ok',
                text: 'Login successful!',
                showConfirmButton: false,
                timer: 1000,
            });
            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: {
                    user,
                    token,
                },
            });
            addUserToLS({ user, token });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Something went wrong - ${error.response.data.msg}`,
            });
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
