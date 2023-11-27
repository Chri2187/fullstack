import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import FormInput from '../components/FormInput';
import { useAppContext } from '../context/appContext';

const initialState = {
    name: '',
    lastname: '',
    email: '',
    password: '',
    isRegistered: false,
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
        const { name, lastname, email, password, isRegistered } = values;

        // if (!lastname || !email || !password || (!name && !isRegistered)) {
        if (!email || !password) {
            Swal.fire(
                'I campi Email e Password sono obbligatori',
                '',
                'warning'
            );
            return;
        }

        const currUser = { name, lastname, email, password };

        if (isRegistered) {
            loginUser(currUser);
        } else {
            registerUser(currUser);
        }
    };

    useEffect(() => {
        if (token) {
            setTimeout(() => {
                navigate('/home');
            }, 2000);
        }
    }, [token, navigate]);

    return (
        <>
            <div id='formContainer' className='container p-3 mb-5 bg-body '>
                <h1 className='text-center'>
                    {values.isRegistered ? 'Login' : 'Registrati'}
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <FormInput
                            type='text'
                            value={values.name}
                            name='name'
                            labelText='Nome'
                            handleChange={handleChange}
                        />
                        <FormInput
                            type='text'
                            value={values.lastname}
                            name='lastname'
                            labelText='Cognome'
                            handleChange={handleChange}
                        />
                        <FormInput
                            type='email'
                            value={values.email}
                            name='email'
                            labelText='Email'
                            handleChange={handleChange}
                            reqiured
                        />
                        <FormInput
                            type='password'
                            value={values.password}
                            name='password'
                            labelText='Password'
                            handleChange={handleChange}
                            reqiured
                        />
                    </div>
                    <div className='d-grid gap-2'>
                        <button
                            type='submit'
                            className='btn btn-outline-success mb-3'
                        >
                            Registrati
                        </button>
                        <div className='d-flex'>
                            <p>
                                Hai già un account?
                                <Link to='/' className='mx-2'>
                                    Entra!
                                </Link>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Register;
