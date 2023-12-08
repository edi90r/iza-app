import { useState, useEffect } from 'react';
import UserExcereptTable from '../components/Organism/UserExcerptTable/UserExcerptTable';
import { getUsersExcertp } from '../../controlers/admin';

const Dashboard = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsersExcertp(true, 5).then(setUsers);
    }, []);

    return (
        <div className=' flex w-full flex-col'>
            <div className='flex w-full items-center justify-center' style={{ height: '20vh' }}>
                <h2>Stats Container</h2>
            </div>
            <div className='w-full flex-1'>
                <UserExcereptTable users={users} />
            </div>
        </div>
    );
};

export default Dashboard;
