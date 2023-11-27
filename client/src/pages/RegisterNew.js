import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const urlBE = 'http://localhost:3001/api/auth';

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(urlBE + '/register', {
                email,
                password,
            });
            console.log(response.data);
            if (response.data.user.email === email) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', response.data.user.name);
                navigate('/home');
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong - Check credentials',
                });
            }

            Swal.fire({
                icon: 'success',
                title: 'Ok',
                text: 'Login successful!',
                showConfirmButton: false,
                timer: 1000,
            });
            // setTimeout(() => {
            //     window.location.reload(false);
            // }, 1000);
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
            <div id='formContainer' className='container w-50'>
                <h1 className='text-center'>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className='form-floating mb-3'>
                        <input
                            type='email'
                            className='form-control'
                            id='floatingInput'
                            placeholder='name@example.com'
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                        <label htmlFor='floatingInput'>Email</label>
                    </div>
                    <div className='form-floating mb-3'>
                        <input
                            type='password'
                            className='form-control'
                            id='floatingPassword'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                        <label htmlFor='floatingPassword'>Password</label>
                    </div>
                    <div className='d-grid gap-2'>
                        <button className='btn btn-primary' type='button'>
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
