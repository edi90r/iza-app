import React from 'react';
import { Link } from 'react-router-dom';

const PwaApp = () => {
    return (
        <div>
            <h2 className='font-montserrat'>PWA App </h2>
            <Link to='/'>powrót</Link>
        </div>
    );
};

export default PwaApp;
