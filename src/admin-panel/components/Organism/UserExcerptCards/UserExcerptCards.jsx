import PropTypes from 'prop-types';
import UserCard from '../../Molecules/UserCard/UserCard';
import { v4 as uuidv4 } from 'uuid';

const UserExcerptCards = ({ users }) => {
    return (
        <div className='flex w-full flex-col lg:hidden'>
            {users.map((user) => (
                <UserCard key={uuidv4()} user={user} />
            ))}
        </div>
    );
};

UserExcerptCards.propTypes = {
    users: PropTypes.array.isRequired,
};

export default UserExcerptCards;
