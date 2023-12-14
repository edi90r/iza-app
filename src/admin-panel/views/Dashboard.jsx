import { useState, useEffect } from 'react';
import { getUsersExcertp } from '../../controlers/admin';
import { useStore } from '../store/useStore';
import UserExcerptCards from '../components/Organism/UserExcerptCards/UserExcerptCards';
import UserExcereptTable from '../components/Organism/UserExcerptTable/UserExcerptTable';
import StatsContainer from '../components/Organism/StatsContainer/StatsContainer';
import { getuUserStats } from '../../utils/helpers';

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const { table } = useStore();

    const days = table.mode === 'oneDay' ? 1 : 5;
    const stats = getuUserStats(users);
    console.log(users);
    useEffect(() => {
        getUsersExcertp(true, days).then(setUsers);
    }, [days]);

    return (
        <div className=' flex w-full flex-col'>
            <StatsContainer userStats={stats} />
            <UserExcereptTable users={users} />
            <UserExcerptCards users={users} />
        </div>
    );
};

export default Dashboard;
