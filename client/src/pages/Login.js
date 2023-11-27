import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import FormInput from '../components/FormInput';

const Login = () => {
    const navigate = useNavigate();
    const initialState = {
        email: '',
        password: '',
    };
    const { loginUser, token } = useAppContext();

    useEffect(() => {
        if (token) {
            setTimeout(() => {
                navigate('/home');
            }, 1000);
        }
    }, [token, navigate]);

    const urlBE = 'http://localhost:3001/api/auth';
    const [values, setValues] = useState(initialState);
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // const response = await axios.post(urlBE + '/login', {
            //     email,
            //     password,
            // });
            // console.log(response.data);
            // if (response.data.user.email === email) {
            //     localStorage.setItem('token', response.data.token);
            //     localStorage.setItem('user', response.data.user.name);
            //     navigate('/home');
            // } else {
            //     Swal.fire({
            //         icon: 'error',
            //         title: 'Oops...',
            //         text: 'Something went wrong - Check credentials',
            //     });
            // }
            // if (!email || !password) {
            //     Swal.fire(
            //         'I campi Email e Password sono obbligatori',
            //         '',
            //         'warning'
            //     );
            //     return;
            // }
            const { email, password } = values;
            const currUser = { email, password };
            console.log(currUser);
            loginUser(currUser);

            Swal.fire({
                icon: 'success',
                title: 'Ok',
                text: 'Login successful!',
                showConfirmButton: false,
                timer: 1000,
            });
            setTimeout(() => {
                window.location.reload(false);
            }, 1000);
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong - Check credentials',
            });
        }
    };
    return (
        <>
            <div id='formContainer' className='container w-50  '>
                <h1 className='text-center'>Accedi</h1>
                <form onSubmit={handleSubmit}>
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
                    <div className='d-grid gap-2'>
                        <button
                            className='btn btn-outline-primary'
                            type='submit'
                        >
                            Login
                        </button>
                    </div>
                </form>
                <div className='d-flex'>
                    <p>
                        Non hai un account?
                        <Link to='/register' className='mx-2'>
                            Registrati qui!
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Login;
