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

    useEffect(() => {
        const fetchUsers = async () => {
            const users = await getUsersExcertp(true, days);
            setUsers(users);
        };

        fetchUsers();
    }, [days]);

    return (
        <>
            <StatsContainer userStats={stats} />
            <UserExcereptTable users={users} />
            <UserExcerptCards users={users} />
        </>
    );
};

export default Dashboard;
