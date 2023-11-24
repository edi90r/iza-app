import React from 'react';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
    return (
        <div>
            <h2 className='font-montserrat'>Admin Panel </h2>
            <Link to='/'>powrót</Link>
        </div>
    );
};

export default AdminPanel;
