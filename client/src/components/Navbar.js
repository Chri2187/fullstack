import React from 'react';
import { Link } from 'react-router-dom';
import { BsCurrencyExchange, BsListTask } from 'react-icons/bs';
import { TiWeatherPartlySunny } from 'react-icons/ti';
import { AiOutlineLogin, AiOutlineLogout } from 'react-icons/ai';

const Navbar = () => {
    const user = localStorage.getItem('user');
    const handleLogout = () => {
        window.location.reload(false);
        localStorage.clear();
    };
    return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
            <div className='container-fluid'>
                <button
                    className='navbar-toggler'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#navbarSupportedContent'
                    aria-controls='navbarSupportedContent'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                >
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div
                    className='collapse navbar-collapse'
                    id='navbarSupportedContent'
                >
                    <ul className='navbar-nav mx-auto mb-2 mb-lg-0'>
                        <li className='nav-item'>
                            <Link
                                className='nav-link active'
                                aria-current='page'
                                to='/home'
                            >
                                Home
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link' to='/meteo'>
                                Meteo <TiWeatherPartlySunny color='#d2f1f2' />
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link' to='/converter'>
                                EUR -&gt; USD
                                <BsCurrencyExchange color='#4287f5' />
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link' to='/tasks'>
                                Task List <BsListTask color='#f5b618' />
                            </Link>
                        </li>
                        {user ? (
                            <li className='nav-item'>
                                <Link className='nav-link' to='/'>
                                    <span
                                        className='badge rounded-pill bg-info text-dark'
                                        onClick={handleLogout}
                                    >
                                        <AiOutlineLogout
                                            className='mr-5'
                                            color='white'
                                            size={15}
                                            title='Logout'
                                        />
                                    </span>
                                </Link>
                            </li>
                        ) : (
                            ''
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
