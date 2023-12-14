import { useLocation } from 'react-router-dom';

const UserDetails = () => {
    let location = useLocation().pathname;
    return (
        <div>
            User <p>Location: {location}</p>
        </div>
    );
};

export default UserDetails;
