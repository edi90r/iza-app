import { useLocation } from 'react-router-dom';

const UserDetails = () => {
    let location = useLocation().pathname;
    return <div>User {location}</div>;
};

export default UserDetails;
