import PropTypes from 'prop-types';
import CardWrapper from '../../Atoms/CardWrapper/CardWrapper';
import CardHeader from '../../Molecules/CardHeader/CardHeader';
import UserCard from '../../Molecules/UserCard/UserCard';
import { v4 as uuidv4 } from 'uuid';

const UserExcerptCards = ({ users }) => {
    return (
        <CardWrapper className='flex w-full flex-col xs:hidden'>
            <CardHeader
                title='Użytkownicy'
                describe='Lista użytkowników, zmień liczbę wyświetlanych dni aby zobaczyć kondycje użytkowników kolejno z jedno lub pięciu dni'
            />
            <div className='flex flex-wrap gap-4 px-4 py-8'>
                {users.map((user) => (
                    <UserCard key={uuidv4()} user={user} />
                ))}
            </div>
        </CardWrapper>
    );
};

UserExcerptCards.propTypes = {
    users: PropTypes.array.isRequired,
};

export default UserExcerptCards;
