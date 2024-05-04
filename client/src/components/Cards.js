import React from 'react';
import { Link } from 'react-router-dom';

const Cards = ({ titolo, testo, img, link }) => {
    return (
        // <div className='col'>
        //     <div className='card' style={{ width: '18rem' }}>
        //         <img src={img} className='card-img-top' alt={titolo} />
        //         <div className='card-body'>
        //             <h5 className='card-title'>{titolo}</h5>
        //             <p className='card-text'>{testo}</p>
        //             <Link to={link} className='btn btn-primary d-grid gap-2'>
        //                 Apri
        //             </Link>
        //         </div>
        //     </div>
        // </div>
        <div
            className='card mb-3 p-3 text-center'
            style={{ 'max-width': '540px' }}
        >
            <div className='row g-0'>
                <div className='col-md-4'>
                    <img src={img} className='card-img-top' alt={titolo} />
                </div>
                <div className='col-md-8'>
                    <div className='card-body'>
                        <h5 className='card-title'>{titolo}</h5>
                        <p className='card-text'>{testo}</p>
                    </div>
                    <div className='d-grid gap-2 col-6 mx-auto'>
                        <Link to={link} className='btn btn-primary'>
                            Apri
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cards;
