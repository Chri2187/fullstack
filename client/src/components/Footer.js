import React from 'react';
import { BsCurrencyExchange, BsListTask } from 'react-icons/bs';
import { TiWeatherPartlySunny } from 'react-icons/ti';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <nav className='navbar fixed-bottom navbar-dark bg-dark'>
            <Link className='navbar-brand mx-auto' to='/'>
                CFM | FullStack Project
            </Link>
            <button
                className='navbar-toggler'
                type='button'
                data-bs-toggle='offcanvas'
                data-bs-target='#offcanvasNavbar'
                aria-controls='offcanvasNavbar'
            >
                <span className='navbar-toggler-icon'></span>
            </button>
            <div
                className='offcanvas offcanvas-end bg-dark'
                tabindex='-1'
                id='offcanvasNavbar'
                aria-labelledby='offcanvasNavbarLabel'
            >
                <div className='offcanvas-header'>
                    <h5 className='offcanvas-title' id='offcanvasNavbarLabel'>
                        Offcanvas
                    </h5>
                    <button
                        type='button'
                        className='btn-close btn-close-white text-reset '
                        data-bs-dismiss='offcanvas'
                        aria-label='Close'
                    ></button>
                </div>
                <div className='offcanvas-body'>
                    <ul className='navbar-nav justify-content-end flex-grow-1 pe-3'>
                        <li className='nav-item'>
                            <Link className='nav-link' to='/meteo'>
                                Meteo{' '}
                                <TiWeatherPartlySunny
                                    color='#d2f1f2'
                                    className='mx-1'
                                />
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link' to='/converter'>
                                Convert Value
                                <BsCurrencyExchange
                                    color='#4287f5'
                                    className='mx-2'
                                />
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link' to='/tasks'>
                                Task List{' '}
                                <BsListTask color='#f5b618' className='mx-1' />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Footer;
