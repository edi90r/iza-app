import { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import Loader from '../components/Atoms/Loader/Loader';
import UserExcerptCards from '../components/Organism/UserExcerptCards/UserExcerptCards';
import UserExcereptTable from '../components/Organism/UserExcerptTable/UserExcerptTable';
import StatsContainer from '../components/Organism/StatsContainer/StatsContainer';
import { getUsersExcertp } from '../../controlers/admin';
import { getUserStats } from '../../utils/helpers';

const Dashboard = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const { table } = useStore();
    const days = table.mode === 'oneDay' ? 1 : 5;
    const stats = getUserStats(users);

    useEffect(() => {
        const fetchUsers = async () => {
            const users = await getUsersExcertp(true, days);
            if (!users) {
                setIsLoading(true);
            }
            setUsers(users);
            setIsLoading(false);
        };

        fetchUsers();
    }, [days]);

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <StatsContainer userStats={stats} />
                    <UserExcereptTable users={users} />
                    <UserExcerptCards users={users} />
                </>
            )}
        </>
    );
};

export default Dashboard;
