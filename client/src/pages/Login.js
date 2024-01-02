import { useEffect, useState } from 'react';
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

    const [values, setValues] = useState(initialState);
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { email, password } = values;
            const currUser = { email, password };

            loginUser(currUser);

            setTimeout(() => {
                window.location.reload(false);
            }, 1000);
        } catch (err) {
            console.log('dentro errore login');
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong - Check credentials',
            });
        }
    };

    return (
        <>
            <div id='formContainer' className='container  '>
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
                            className='btn btn-outline-primary mb-3'
                            type='submit'
                        >
                            Login
                        </button>
                        <div className='d-flex'>
                            <p>
                                Non hai un account?
                                <Link to='/register' className='mx-2'>
                                    Registrati qui!
                                </Link>
                            </p>
                        </div>
                    </div>
                    <div className='d-grid gap-2'></div>
                </form>
            </div>
        </>
    );
};

export default Login;
